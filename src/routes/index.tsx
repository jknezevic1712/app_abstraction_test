import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "#/components/atoms/button";
import { RadioGroupChoiceCards } from "#/components/molecules/radio-group-choice-cards";
import { useStore } from "#/lib/integrations";
import type { Character, RadioGroupChoice, StoreProvider } from "#/lib/models";

export const Route = createFileRoute("/")({ component: Home });

const radioGroupChoices: RadioGroupChoice[] = [
	{
		title: "Davstack",
		value: "davstack" as StoreProvider,
	},
	{
		title: "Tanstack",
		value: "tanstack" as StoreProvider,
	},
];

function Home() {
	const [storeProvider, setStoreProvider] = useState<StoreProvider>("tanstack");

	const store = useStore(storeProvider);
	const form = useForm({
		defaultValues: {
			name: "Thazud",
			hp: 405000,
			level: 90,
			power: 1532,
		} as Character,
		onSubmit: ({ value }) => {
			console.log(value);
			handleSetPlayerData(value);
		},
	});
	const playerData = useMemo(() => {
		const data = store.playerData;
		if (!data) return null;

		form.setFieldValue("name", data.name);
		form.setFieldValue("hp", data.hp);
		form.setFieldValue("level", data.level);
		form.setFieldValue("power", data.power);

		return store.playerData;
	}, [store.playerData, form.setFieldValue]);

	function handleSetPlayerData(data?: Character) {
		const payload: Character = {
			name: data?.name ?? "Player 1",
			hp: data?.hp ?? 500000,
			level: data?.level ?? 90,
			power: data?.power ?? 1500,
		};

		store.setPlayerData(payload);
	}

	function FieldInfo({ field }: { field: AnyFieldApi }) {
		return (
			<>
				{field.state.meta.isTouched && !field.state.meta.isValid ? (
					<em>{field.state.meta.errors.join(",")}</em>
				) : null}
				{field.state.meta.isValidating ? "Validating..." : null}
			</>
		);
	}

	return (
		<div className="max-w-xl mx-auto p-8 flex flex-col gap-4 justify-start items-center">
			<h1 className="text-4xl font-bold mb-14">App abstraction test</h1>

			<div className="flex justify-center items-start gap-4 w-full">
				<RadioGroupChoiceCards
					choices={radioGroupChoices}
					value={storeProvider}
					onChange={(chosenStoreProvider) => {
						setStoreProvider(chosenStoreProvider as StoreProvider);
					}}
				/>
			</div>

			<div className="p-4 flex flex-col justify-start items-center gap-4 border rounded-xl">
				<Button className="w-full" onClick={() => handleSetPlayerData()}>
					Generate player data
				</Button>

				{playerData && (
					<div className="w-full p-2 flex flex-col justify-start items-start gap-3">
						<h2>Name: {playerData.name}</h2>
						<p>Level: {playerData.level}</p>
						<p>HP: {playerData.hp}</p>
						<p>Power: {playerData.power}</p>
					</div>
				)}
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="p-4 flex flex-col gap-3 justify-start items-center border rounded-xl"
			>
				<div className="w-full flex gap-4 justify-start items-center">
					{/* A type-safe field component*/}
					<form.Field
						name="name"
						validators={{
							onChange: ({ value }) =>
								!value
									? "A name is required"
									: value.length < 3
										? "Name must be at least 3 characters"
										: undefined,
						}}
						children={(field) => {
							// Avoid hasty abstractions. Render props are great!
							return (
								<>
									<label htmlFor={field.name}>Name:</label>
									<input
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<FieldInfo field={field} />
								</>
							);
						}}
					/>
				</div>

				<div className="w-full flex gap-4 justify-start items-center">
					<form.Field
						name="hp"
						children={(field) => (
							<>
								<label htmlFor={field.name}>HP:</label>
								<input
									id={field.name}
									name={field.name}
									value={field.state.value}
									type="number"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>

				<div className="w-full flex gap-4 justify-start items-center">
					<form.Field
						name="level"
						children={(field) => (
							<>
								<label htmlFor={field.name}>Level:</label>
								<input
									id={field.name}
									name={field.name}
									value={field.state.value}
									type="number"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>

				<div className="w-full flex gap-4 justify-start items-center">
					<form.Field
						name="power"
						children={(field) => (
							<>
								<label htmlFor={field.name}>Power:</label>
								<input
									id={field.name}
									name={field.name}
									value={field.state.value}
									type="number"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.valueAsNumber)}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<>
							<Button className="w-full" type="submit" disabled={!canSubmit}>
								{isSubmitting ? "..." : "Submit"}
							</Button>
							<Button
								className="w-full"
								type="reset"
								onClick={(e) => {
									// Avoid unexpected resets of form elements (especially <select> elements)
									e.preventDefault();
									form.reset();
								}}
							>
								Reset
							</Button>
						</>
					)}
				/>
			</form>
		</div>
	);
}
