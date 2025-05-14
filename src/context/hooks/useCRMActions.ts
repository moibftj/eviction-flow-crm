
import { useReducer } from 'react';
import { crmReducer } from '../crmReducer';
import { initialState } from '../crmInitialState';
import { CRMContextType } from '../crmTypes';
import * as actions from '../actions/crmActions';

export const useCRMActions = (): CRMContextType => {
  const [state, dispatch] = useReducer(crmReducer, initialState);

  const addOwner = (owner: Parameters<CRMContextType["addOwner"]>[0]) => {
    dispatch(actions.addOwnerAction(owner));
  };

  const updateOwner = (owner: Parameters<CRMContextType["updateOwner"]>[0]) => {
    dispatch(actions.updateOwnerAction(owner));
  };

  const addTenant = (tenant: Parameters<CRMContextType["addTenant"]>[0]) => {
    dispatch(actions.addTenantAction(tenant));
  };

  const updateTenant = (tenant: Parameters<CRMContextType["updateTenant"]>[0]) => {
    dispatch(actions.updateTenantAction(tenant));
  };

  const addProperty = (property: Parameters<CRMContextType["addProperty"]>[0]) => {
    dispatch(actions.addPropertyAction(property));
  };

  const updateProperty = (property: Parameters<CRMContextType["updateProperty"]>[0]) => {
    dispatch(actions.updatePropertyAction(property));
  };

  const addCase = (caseData: Parameters<CRMContextType["addCase"]>[0]) => {
    dispatch(actions.addCaseAction(caseData));
  };

  const updateCase = (caseData: Parameters<CRMContextType["updateCase"]>[0]) => {
    dispatch(actions.updateCaseAction(caseData));
  };

  const updateCaseStage = (caseId: string, stage: Parameters<CRMContextType["updateCaseStage"]>[1]) => {
    dispatch(actions.updateCaseStageAction(caseId, stage));
  };

  const addDocument = (document: Parameters<CRMContextType["addDocument"]>[0]) => {
    dispatch(actions.addDocumentAction(document));
  };

  const updateDocument = (document: Parameters<CRMContextType["updateDocument"]>[0]) => {
    dispatch(actions.updateDocumentAction(document));
  };

  const deleteDocument = (documentId: string) => {
    dispatch(actions.deleteDocumentAction(documentId));
  };

  const addNote = (note: Parameters<CRMContextType["addNote"]>[0]) => {
    dispatch(actions.addNoteAction(note));
  };

  const addReminder = (reminder: Parameters<CRMContextType["addReminder"]>[0]) => {
    dispatch(actions.addReminderAction(reminder));
  };

  const updateReminder = (reminder: Parameters<CRMContextType["updateReminder"]>[0]) => {
    dispatch(actions.updateReminderAction(reminder));
  };

  const completeReminder = (reminderId: string) => {
    dispatch(actions.completeReminderAction(reminderId));
  };

  return {
    ...state,
    addOwner,
    updateOwner,
    addTenant,
    updateTenant,
    addProperty,
    updateProperty,
    addCase,
    updateCase,
    updateCaseStage,
    addDocument,
    updateDocument,
    deleteDocument,
    addNote,
    addReminder,
    updateReminder,
    completeReminder,
  };
};
