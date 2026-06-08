import type { RadioGroupChoice } from "#/lib/models";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@/components/molecules/field";

export function RadioGroupChoiceCards({
	choices,
	value,
	onChange,
}: {
	choices: RadioGroupChoice[];
	value: string;
	onChange: (choice: string) => void;
}) {
	return (
		<RadioGroup
			defaultValue="plus"
			className="max-w-sm"
			value={value}
			onValueChange={onChange}
		>
			{choices.map((choice) => (
				<FieldLabel key={choice.value} htmlFor={choice.title}>
					<Field orientation="horizontal">
						<FieldContent>
							<FieldTitle>{choice.title}</FieldTitle>
							{choice.description && (
								<FieldDescription>{choice.description}</FieldDescription>
							)}
						</FieldContent>
						<RadioGroupItem value={choice.value} id={choice.title} />
					</Field>
				</FieldLabel>
			))}
		</RadioGroup>
	);
}
