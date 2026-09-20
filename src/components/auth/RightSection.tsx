import { LoginForm } from "@/components/auth/LoginForm";

export function RightSection() {
	return (
		<section className="flex flex-col justify-center bg-background p-12 border-l border-border">
			<div className="max-w-100 mx-auto">
				<LoginForm />
			</div>
		</section>
	);
}
