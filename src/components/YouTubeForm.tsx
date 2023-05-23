import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
	username: string;
	email: string;
	channel: string;
	social: {
		twitter: string;
		facebook: string;
	};
	phoneNumbers: string[];
	phNumbers: {
		number: string;
	}[];
	age: number;
	dob: Date;
};

const YouTubeForm = () => {
	const {
		register,
		control,
		handleSubmit,
		formState,
		watch,
		getValues,
		setValue,
		reset,
	} = useForm<FormValues>({
		// defaultValues: async () => {
		// 	const response = await fetch(
		// 		"https://jsonplaceholder.typicode.com/users/1"
		// 	);
		// 	const data = await response.json();
		// 	return {
		// 		username: "Batman",
		// 		email: data.email,
		// 		channel: "",
		// 	};
		// },
		defaultValues: {
			username: "Batman",
			email: "",
			channel: "",
			social: {
				twitter: "",
				facebook: "",
			},
			phoneNumbers: ["", ""],
			phNumbers: [{ number: "" }],
			age: 0,
			dob: new Date(),
		},
	});
	const {
		errors,
		touchedFields,
		dirtyFields,
		isDirty,
		isValid,
		isSubmitting,
		isSubmitted,
		isSubmitSuccessful,
		submitCount,
	} = formState;

	console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

	const { fields, append, remove } = useFieldArray({
		name: "phNumbers",
		control,
	});

	const onSubmit = (data: FormValues) => {
		console.log("Form Submitted", data);
	};

	const onError = (errors: FieldErrors<FormValues>) => {
		console.log("Form errors", errors);
	};

	// useEffect(() => {
	// 	if (isSubmitSuccessful) {
	// 		reset();
	// 	}
	// }, [isSubmitSuccessful, reset]);

	useEffect(() => {
		const subscription = watch((value) => {
			console.log(value);
		});

		return subscription.unsubscribe();
	}, [watch]);

	const handleGetValues = () => {
		console.log(getValues(["username", "email"]));
	};

	const handleSetValue = () => {
		setValue("username", "Bruce Wayne", {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const watchUsername = watch(["username", "email"]);

	return (
		<div>
			<h1>Youtube Form</h1>
			<h2>Watched Value: {watchUsername}</h2>
			<form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: {
								value: true,
								message: "Username is required",
							},
						})}
					/>
					<p className="error">{errors.username?.message}</p>
				</div>

				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address",
							},
							validate: {
								notAdmin: (fieldValue) => {
									return (
										fieldValue !== "admin@example.com" ||
										"Enter a different email address"
									);
								},
								notBlackListed: (fieldValue) => {
									return (
										!fieldValue.endsWith("baddomain.com") ||
										"This domain is not supported"
									);
								},
							},
						})}
					/>
					<p className="error">{errors.email?.message}</p>
				</div>

				<div className="form-control">
					<label htmlFor="channel">Channel</label>
					<input
						type="text"
						id="channel"
						{...register("channel", {
							required: {
								value: true,
								message: "Channel is required",
							},
						})}
					/>
					<p className="error">{errors.channel?.message}</p>
				</div>

				<div className="form-control">
					<label htmlFor="twitter">Twitter</label>
					<input
						type="text"
						id="twitter"
						{...register("social.twitter", {
							required: {
								value: true,
								message: "Twitter is required",
							},
							disabled: watch("channel") === "",
						})}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="facebook">Facebook</label>
					<input
						type="text"
						id="facebook"
						{...register("social.facebook", {
							required: {
								value: true,
								message: "Facebook is required",
							},
						})}
					/>
				</div>

				<div className="form-control">
					<label htmlFor="primary-phone">Primary phone Number</label>
					<input
						type="text"
						id="primary-phone"
						{...register("phoneNumbers.0", {
							required: {
								value: true,
								message: "Primary phone number is required",
							},
						})}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="secondary-phone">Secondary phone Number</label>
					<input
						type="text"
						id="secondary-phone"
						{...register("phoneNumbers.1", {
							required: {
								value: true,
								message: "Secondary phone number is required",
							},
						})}
					/>
				</div>

				<div>
					<label>List of phone numbers</label>
					<div>
						{fields.map((field, index) => {
							return (
								<div className="form-contro" key={field.id}>
									<input
										type="text"
										{...register(`phNumbers.${index}.number` as const)}
									/>
									{index > 0 && (
										<button type="button" onClick={() => remove(index)}>
											Remove
										</button>
									)}
								</div>
							);
						})}
						<button type="button" onClick={() => append({ number: "" })}>
							Add phone number
						</button>
					</div>
				</div>

				<div className="form-control">
					<label htmlFor="age">Age</label>
					<input
						type="number"
						id="age"
						{...register("age", {
							valueAsNumber: true,
							required: {
								value: true,
								message: "Age is required",
							},
						})}
					/>
					<p className="error">{errors.age?.message}</p>
				</div>

				<div className="form-control">
					<label htmlFor="dob">Date of Birth</label>
					<input
						type="date"
						id="dob"
						{...register("dob", {
							valueAsDate: true,
							required: {
								value: true,
								message: "Date of Birth is required",
							},
						})}
					/>
					<p className="error">{errors.dob?.message}</p>
				</div>

				<button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
				<button type="button" onClick={() => reset()}>
					Reset
				</button>
				<button type="button" onClick={handleGetValues}>
					Get values
				</button>
				<button type="button" onClick={handleSetValue}>
					Set value
				</button>
			</form>
			<DevTool control={control} />
		</div>
	);
};
export default YouTubeForm;
