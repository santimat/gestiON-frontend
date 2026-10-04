import { LoginForm } from "@/components/auth/LoginForm";

export const RightSection = () => {
  return (
    <section className="bg-background border-border flex flex-col justify-center border-l p-12">
      <div className="mx-auto max-w-100">
        <LoginForm />
      </div>
    </section>
  );
};
