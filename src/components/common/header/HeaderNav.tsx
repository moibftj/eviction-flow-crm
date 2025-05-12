
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderNav: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Eviction Consultation CRM</h2>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline"
              onClick={() => navigate("/new-lead")}
            >
              + Add New Lead
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
