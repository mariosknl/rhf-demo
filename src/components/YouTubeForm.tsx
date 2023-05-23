import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const YouTubeForm = () => {
	const { register, control } = useForm();

	return (
		<div>
			<form>
				<label htmlFor="username">Username</label>
				<input type="text" id="username" {...register("username")} />

				<label htmlFor="email">Email</label>
				<input type="email" id="email" {...register("email")} />

				<label htmlFor="channel">Channel</label>
				<input type="text" id="channel" {...register("channel")} />

				<button>Submit</button>
			</form>
			<DevTool control={control} />
		</div>
	);
};
export default YouTubeForm;
