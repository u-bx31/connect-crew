"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@/public/assets/index";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface props {
	user: {
		id: string;
		objectId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: props) => {
	const [files, setFiles] = useState<File[]>([]);
	const form = useForm({
		resolver: zodResolver(userValidation),
		defaultValues: {
			profile_photo: user?.image || "",
			name: user?.name || "",
			username: user?.username || "",
			bio: user?.bio || "",
		},
	});
	const onSubmit = (values: z.infer<typeof userValidation>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	};
	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();
		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setFiles(Array.from(e.target.files));
			console.log('files',files);
			if (!file.type.includes("image")) return;
			fileReader.onload = async (e) => {
				const imageDataUrl = e.target?.result?.toString() || "";
				console.log('url',imageDataUrl);
				fieldChange(imageDataUrl);
			};
			fileReader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<h2 className="text-center text-body-semibold mb-4">Account profile</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col justify-start gap-5">
					<FormField
						control={form.control}
						name="profile_photo"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center  gap-4">
								<FormLabel className="account-form_image-label relative group">
									<Image
										src={field.value ? field.value : "/assets/profile.svg"}
										alt="avatar"
										width={86}
										height={86}
										priority={field.value != ""}
										className={`${
											field?.value ? "rounded-full !w-full !h-full" : "!w-12 !h-12"
										} object-cover `}
									/>
									<div className="absolute w-full h-full rounded-full hidden group-hover:block group-hover:bg-gray-400 group-hover:bg-opacity-[60%] ">
										<PlusCircle className="absolute stroke-gray-900 stroke-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
									</div>
								</FormLabel>
								<FormControl>
									<Input
										className="account-form_image-input hidden"
										type="file"
										placeholder="Upload your profile image"
										accept="image/*"
										onChange={(e) => handleImage(e, field.onChange)}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start gap-1">
								<FormLabel className="text-base-semibold">Name</FormLabel>
								<FormControl>
									<Input
										className="account-form_input"
										type="text"
										placeholder="Type your name"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start gap-1">
								<FormLabel className="text-base-semibold">Username</FormLabel>
								<FormControl>
									<Input
										className="account-form_input"
										type="text"
										placeholder="Type your name"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem className="flex flex-col items-start gap-1">
								<FormLabel className="text-base-semibold">Bio</FormLabel>
								<FormControl>
									<Textarea
										className="account-form_input"
										placeholder="Type your name"
										rows={6}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button className="mt-10 bg-primary-500" type="submit">
						{btnTitle}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default AccountProfile;
