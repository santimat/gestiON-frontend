import { useState } from "react";
import { SegmentedControl } from "@mantine/core";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function RightSection() {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <section className="flex flex-col justify-center bg-background p-12 border-l border-border">
      <div className="max-w-100 mx-auto">
        <SegmentedControl
          mb={"sm"}
          fullWidth
          color="hsl(213.9deg 82.64% 47.45%)"
          autoContrast
          onChange={setFormType}
          data={[
            {
              label: "Iniciar Sesión",
              value: "login",
            },
            {
              label: "Registrar comercio",
              value: "register",
            },
          ]}
        />
        {formType == "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </section>
  );
}
