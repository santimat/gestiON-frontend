import { toast } from "sonner";
import { useState, type SubmitEvent } from "react";

import type { AppError, FieldErrors } from "@shared/types";
import { toastAppError } from "@shared/utils/toastAppError";

type EntityFormMessages = { create: string; update: string };

type UseEntityFormOptions<TForm> = {
  initialValues: TForm;
  isEditing: boolean;
  closeModal: () => void;
  submit: (form: TForm, e: SubmitEvent<HTMLFormElement>) => Promise<void>;
  successMessages: EntityFormMessages;
  errorMessages: EntityFormMessages;
};

export const useEntityForm = <TForm>({
  initialValues,
  isEditing,
  closeModal,
  submit,
  successMessages,
  errorMessages,
}: UseEntityFormOptions<TForm>) => {
  const [form, setForm] = useState<TForm>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await submit(form, e);
      setErrors({});
      closeModal();
      toast.success(
        isEditing ? successMessages.update : successMessages.create,
      );
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) return setErrors(appError.fieldErrors);
      toastAppError(
        error,
        isEditing ? errorMessages.update : errorMessages.create,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, setForm, errors, isSubmitting, handleSubmit };
};
