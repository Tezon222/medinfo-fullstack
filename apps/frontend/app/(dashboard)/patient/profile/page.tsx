"use client";

import { CameraIcon } from "@/components/icons";
import { Button, Form, Select } from "@/components/ui";
import { useForm } from "react-hook-form";

function ProfilePage() {
	const userIdentityMethods = useForm({
		defaultValues: { firstName: "", lastName: "", gender: "", bio: "" },
	});

	const contactInfoMethods = useForm({
		defaultValues: { email: "", phoneNumber: "" },
	});

	const locationMethods = useForm({
		defaultValues: { country: "", city: "" },
	});

	const changePasswordMethods = useForm({
		defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
	});

	return (
		<main className="flex flex-col gap-8 px-6 py-14">
			<section
				className="flex flex-col gap-5 rounded-[16px] p-4 shadow-[0_4px_6px_hsl(150,20%,25%,0.25)]
					lg:bg-white lg:p-8"
			>
				<div
					className="border-medinfo-primary-main relative -z-10 size-[108px] rounded-full
						border-[1.4px] bg-gray-300 lg:size-[140px]"
				>
					<div
						className="border-medinfo-primary-main absolute right-0 top-[2px] flex size-[24px]
							items-center justify-center rounded-full border-[1.4px] bg-white lg:size-[40px]"
					>
						<CameraIcon className="size-[16px] lg:size-[26px]" />
					</div>
				</div>

				<div className="flex gap-4">
					<Button theme="secondary">Remove</Button>
					<Button theme="primary">Change</Button>
				</div>
			</section>

			<section
				className="flex flex-col gap-5 rounded-[16px] p-4 shadow-[0_4px_6px_hsl(150,20%,25%,0.25)]
					lg:flex-row lg:justify-between lg:bg-white lg:p-8"
			>
				<h3 className="text-[18px] font-medium">User Identity</h3>

				<Form.Root className="w-full max-w-[372px] gap-3 self-center" methods={userIdentityMethods}>
					<Form.Field<typeof userIdentityMethods.control>
						name="firstName"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">First Name</Form.Label>
						<Form.Input
							type="text"
							className="border-medinfo-primary-main placeholder:text-medinfo-dark-4 h-[48px]
								rounded-[8px] border-[1.4px] px-4 py-3 focus-visible:ring-transparent md:h-[64px]
								md:py-5 md:text-base"
						/>
					</Form.Field>
					<Form.Field<typeof userIdentityMethods.control>
						name="lastName"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">Last Name</Form.Label>
						<Form.Input
							type="text"
							className="border-medinfo-primary-main placeholder:text-medinfo-dark-4 h-[48px]
								rounded-[8px] border-[1.4px] px-4 py-3 focus-visible:ring-transparent md:h-[64px]
								md:py-5 md:text-base"
						/>
					</Form.Field>

					<Form.Field name="gender" className="font-roboto gap-1 font-medium">
						<Form.Label className="md:text-[20px]">Gender</Form.Label>

						<Form.FieldController
							render={({ field }) => (
								<Select.Root name={field.name} value={field.value} onValueChange={field.onChange}>
									<Select.Trigger
										classNames={{
											base: `border-medinfo-primary-main data-placeholder:text-medinfo-dark-4
											group h-[48px] gap-2 rounded-[8px] border-[1.4px] px-4 font-medium
											md:h-[64px] md:text-base`,
											icon: `text-medinfo-body-color group-data-[state=open]:rotate-180
											md:size-6`,
										}}
									>
										<Select.Value placeholder="specify gender" />
									</Select.Trigger>

									<Select.Content
										classNames={{
											base: `border-medinfo-primary-main border-[1.4px] bg-white/90 p-0
											backdrop-blur-lg`,
											viewport: "gap-1",
										}}
									>
										<Select.Item
											value="male"
											className="bg-medinfo-light-3 text-medinfo-dark-4 focus:bg-medinfo-light-1
												focus:text-medinfo-body-color data-[state=checked]:bg-medinfo-light-1
												h-[48px] font-medium md:h-[64px] md:text-base"
										>
											Male
										</Select.Item>
										<Select.Item
											value="female"
											className="bg-medinfo-light-3 text-medinfo-dark-4 focus:bg-medinfo-light-1
												focus:text-medinfo-body-color data-[state=checked]:bg-medinfo-light-1
												h-[48px] font-medium md:h-[64px] md:text-base"
										>
											Female
										</Select.Item>
									</Select.Content>
								</Select.Root>
							)}
						/>
					</Form.Field>

					<Form.Field<typeof userIdentityMethods.control>
						name="bio"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">Bio</Form.Label>
						<Form.Input
							type="textarea"
							className="border-medinfo-primary-main placeholder:text-medinfo-dark-4 h-[163px]
								rounded-[8px] border-[1.4px] px-4 py-5 focus-visible:ring-transparent md:h-[159px]
								md:text-base"
						/>
					</Form.Field>
				</Form.Root>

				<div className="flex gap-6 self-center lg:self-end">
					<Button theme="secondary">Cancel</Button>
					<Button theme="primary">Save</Button>
				</div>
			</section>

			<section
				className="flex flex-col gap-5 rounded-[16px] p-4 shadow-[0_4px_6px_hsl(150,20%,25%,0.25)]
					lg:flex-row lg:justify-between lg:bg-white lg:p-8"
			>
				<h3 className="text-[18px] font-medium">Contact Info</h3>

				<Form.Root className="w-full max-w-[372px] gap-3 self-center" methods={contactInfoMethods}>
					<Form.Field<typeof contactInfoMethods.control>
						name="email"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">Email</Form.Label>
						<Form.Input
							type="text"
							className="border-medinfo-primary-main placeholder:text-medinfo-dark-4 h-[48px]
								rounded-[8px] border-[1.4px] px-4 py-3 focus-visible:ring-transparent md:h-[64px]
								md:py-5 md:text-base"
						/>
					</Form.Field>
					<Form.Field<typeof contactInfoMethods.control>
						name="phoneNumber"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">Phone number</Form.Label>
						<Form.Input
							type="number"
							className="border-medinfo-primary-main placeholder:text-medinfo-dark-4 h-[48px]
								rounded-[8px] border-[1.4px] px-4 py-3 focus-visible:ring-transparent md:h-[64px]
								md:py-5 md:text-base"
						/>
					</Form.Field>
				</Form.Root>

				<div className="flex gap-6 self-center lg:self-end">
					<Button theme="secondary">Cancel</Button>
					<Button theme="primary">Save</Button>
				</div>
			</section>

			<section
				className="flex flex-col gap-5 rounded-[16px] p-4 shadow-[0_4px_6px_hsl(150,20%,25%,0.25)]
					lg:flex-row lg:justify-between lg:bg-white lg:p-8"
			>
				<h3 className="text-[18px] font-medium">Location</h3>

				<Form.Root className="w-full max-w-[372px] gap-3 self-center" methods={locationMethods}>
					<Form.Field<typeof locationMethods.control>
						name="country"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">Country</Form.Label>
						<Form.Input
							type="text"
							className="border-medinfo-primary-main placeholder:text-medinfo-dark-4 h-[48px]
								rounded-[8px] border-[1.4px] px-4 py-3 focus-visible:ring-transparent md:h-[64px]
								md:py-5 md:text-base"
						/>
					</Form.Field>
					<Form.Field<typeof locationMethods.control>
						name="city"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">City</Form.Label>
						<Form.Input
							type="text"
							className="border-medinfo-primary-main placeholder:text-medinfo-dark-4 h-[48px]
								rounded-[8px] border-[1.4px] px-4 py-3 focus-visible:ring-transparent md:h-[64px]
								md:py-5 md:text-base"
						/>
					</Form.Field>
				</Form.Root>

				<div className="flex gap-6 self-center lg:self-end">
					<Button theme="secondary">Cancel</Button>
					<Button theme="primary">Save</Button>
				</div>
			</section>

			<section
				className="flex flex-col gap-5 rounded-[16px] p-4 shadow-[0_4px_6px_hsl(150,20%,25%,0.25)]
					lg:flex-row lg:justify-between lg:bg-white lg:p-8"
			>
				<h3 className="text-[18px] font-medium">Change Password</h3>

				<Form.Root className="w-full max-w-[372px] gap-3 self-center" methods={changePasswordMethods}>
					<Form.Field<typeof changePasswordMethods.control>
						name="oldPassword"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">Old password</Form.Label>
						<Form.Input
							type="password"
							classNames={{
								inputGroup: `border-medinfo-primary-main h-[48px] rounded-[8px] border-[1.4px] px-4
								py-3 md:h-[64px] md:py-5`,
								input: `placeholder:text-medinfo-dark-4 border-none focus-visible:ring-transparent
								md:text-base`,
							}}
						/>
					</Form.Field>
					<Form.Field<typeof changePasswordMethods.control>
						name="newPassword"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">New password</Form.Label>
						<Form.Input
							type="password"
							classNames={{
								inputGroup: `border-medinfo-primary-main h-[48px] rounded-[8px] border-[1.4px] px-4
								py-3 md:h-[64px] md:py-5`,
								input: `placeholder:text-medinfo-dark-4 border-none focus-visible:ring-transparent
								md:text-base`,
							}}
						/>
					</Form.Field>
					<Form.Field<typeof changePasswordMethods.control>
						name="confirmPassword"
						className="font-roboto gap-1 font-medium"
					>
						<Form.Label className="md:text-[20px]">Confirm password</Form.Label>
						<Form.Input
							type="password"
							classNames={{
								inputGroup: `border-medinfo-primary-main h-[48px] rounded-[8px] border-[1.4px] px-4
								py-3 md:h-[64px] md:py-5`,
								input: `placeholder:text-medinfo-dark-4 border-none focus-visible:ring-transparent
								md:text-base`,
							}}
						/>
					</Form.Field>
				</Form.Root>

				<div className="flex gap-6 self-center lg:self-end">
					<Button theme="secondary">Cancel</Button>
					<Button theme="primary">Save</Button>
				</div>
			</section>
		</main>
	);
}
export default ProfilePage;
