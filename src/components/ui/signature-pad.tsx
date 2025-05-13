
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Pencil, Eraser, Save, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignaturePadProps {
  onSave: (signature: string) => void;
  width?: number;
  height?: number;
  className?: string;
  defaultValue?: string;
}

export function SignaturePad({
  onSave,
  width = 500,
  height = 200,
  className,
  defaultValue
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(!!defaultValue);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    setCtx(context);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    
    // Load default signature if provided
    if (defaultValue) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
      img.src = defaultValue;
    }
  }, [defaultValue]);

  // Make canvas responsive
  useEffect(() => {
    const adjustCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas || !ctx) return;

      // Save current drawing
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempContext = tempCanvas.getContext('2d');
      if (tempContext) {
        tempContext.drawImage(canvas, 0, 0);
      }

      // Adjust canvas size
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width: containerWidth } = container.getBoundingClientRect();
      
      const newWidth = Math.min(containerWidth, width);
      const scaleFactor = newWidth / canvas.width;
      
      canvas.width = newWidth;
      canvas.height = height * scaleFactor;
      
      // Restore drawing with scaling
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      
      if (tempContext) {
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      }
    };

    adjustCanvas();
    window.addEventListener('resize', adjustCanvas);
    
    return () => {
      window.removeEventListener('resize', adjustCanvas);
    };
  }, [ctx, width, height]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    
    setIsDrawing(true);
    setHasSignature(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event
      ctx.beginPath();
      const touch = e.touches[0];
      ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    } else {
      // Mouse event
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    } else {
      // Mouse event
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    }
    
    ctx.stroke();
  };

  const endDrawing = () => {
    if (ctx) {
      ctx.closePath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSave(dataUrl);
  };
  
  // Touch event handlers to prevent scrolling while drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.target === canvas) {
        e.preventDefault();
      }
    };
    
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Electronic Signature</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative border rounded-md overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="touch-none cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />
          {!hasSignature && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-muted-foreground">
              <p className="text-sm">Sign here</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" type="button" onClick={clearCanvas}>
            <Eraser className="h-4 w-4 mr-1" />
            Clear
          </Button>
          <Button size="sm" variant="outline" type="button" disabled={!hasSignature} onClick={saveSignature}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Pencil className="h-4 w-4" />
          <span>Draw your signature</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SignaturePad;
