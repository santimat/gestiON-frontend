import { StoreIcon } from "@/shared/icons/StoreIcon";
import { TextInput } from "@mantine/core";

export function RegisterForm() {
	return (
		<div>
			<div>
				<form className="pt-2 text-foreground">
					<section className="border-b border-border pb-8 mb-8">
						<p className="uppercase text-secondary-foreground font-semibold text-[14px] tracking-tight pb-4">
							Datos del negocio
						</p>
						<TextInput
							leftSectionPointerEvents="none"
							leftSection={<StoreIcon className="w-5 h-5" />}
							placeholder="Almacén don pepe"
							label="Nombre del comercio"
							mb={"md"}
						/>
						<div className="grid grid-cols-2 gap-2">
							<TextInput
								leftSectionPointerEvents="none"
								placeholder="20-23456798-1"
								label="CUIT"
							/>
							<TextInput
								leftSectionPointerEvents="none"
								placeholder="2346567432"
								label="Teléfono"
							/>
						</div>
					</section>
					<section>
						<p className="uppercase text-secondary-foreground font-semibold text-[14px] tracking-tight pb-4">
							Usuario Administrador
						</p>
					</section>
				</form>
			</div>
		</div>
	);
}
