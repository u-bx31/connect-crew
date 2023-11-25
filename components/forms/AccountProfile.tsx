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
import { ChangeEvent, FormEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { UpdateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

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
	const { startUpload } = useUploadThing("media");
	const router = useRouter();
	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(userValidation),
		defaultValues: {
			profile_photo: user?.image || "",
			name: user?.name || "",
			username: user?.username || "",
			bio: user?.bio || "",
		},
	});
	const onSubmit = async (values: z.infer<typeof userValidation>)=> {
		const blob = values.profile_photo;

		console.log(values);

		const hasImageChanged = isBase64Image(blob);

		if (hasImageChanged) {
			const imgRes = await startUpload(files);
			if (imgRes && imgRes[0].url) {
				values.profile_photo = imgRes[0].url;
			}
		}
		await UpdateUser({
			userId: user.id,
			username: values.username,
			name: values.name,
			bio: values.bio,
			image: values.profile_photo,
			path: pathname,
		});
		if (pathname === "/profile/edit") {
			router.back();
		} else {
			router.push("/");
		}
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
			if (!file.type.includes("image")) return;
			fileReader.onload = async (e) => {
				const imageDataUrl = e.target?.result?.toString() || "";
				fieldChange(imageDataUrl);
			};
			fileReader.readAsDataURL(file);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((e)=>onSubmit(e))}
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
				<Button type="submit" className="mt-10 bg-primary-500">
					{btnTitle}
				</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;
