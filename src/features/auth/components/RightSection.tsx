import { RegisterForm } from "@/features/auth/components/RegisterForm";

export function RightSection() {
	return (
		<section className="flex flex-col justify-center bg-background p-12 border-l border-border">
			<div className="max-w-100 mx-auto">
				<div className="mb-8">
					<h3 className="font-semibold text-2xl mb-2">Registrá tu comercio</h3>
					<p className=" text-secondary-foreground">
						Creamos el comercio y tu usuario administrador en un solo paso.
					</p>
				</div>
				<RegisterForm />
			</div>
		</section>
	);
}
