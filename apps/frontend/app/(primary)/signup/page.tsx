"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useForm } from "react-hook-form";
import { Main } from "@/app/(primary)/-components";
import {
	DropZoneInput,
	DropZoneInputImagePreview,
	IconBox,
	Logo,
	NavLink,
	Show,
} from "@/components/common";
import { Button, DateTimePicker, Form, Select } from "@/components/ui";
import { DropZone } from "@/components/ui/drop-zone";
import { callBackendApi } from "@/lib/api/callBackendApi";

function SignUpPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
	const methods = useForm({
		defaultValues: {
			confirmPassword: "",
			country: "",
			dob: "",
			email: "",
			firstName: "",
			gender: "",
			lastName: "",
			license: null,
			password: "",
			specialty: "",
		},
	});

	const { control } = methods;

	const router = useRouter();

	const { searchParams: searchParamsPromise } = props;

	const searchParams = use(searchParamsPromise);

	const user = searchParams.user as "doctor" | "patient" | undefined;

	const onSubmit = async (data: Record<string, unknown>) => {
		const resolvedUser = user ?? "patient";

		const formData = new FormData();

		for (const [key, value] of Object.entries(data)) {
			formData.set(key, value as string);
		}

		await callBackendApi("/:user/signup", {
			body: formData,
			meta: {
				toast: {
					success: true,
				},
			},
			method: "POST",

			onSuccess: () => {
				router.push("/signin");
			},

			params: { user: resolvedUser },
		});
	};

	return (
		<Main className="w-full px-0 max-md:max-w-[400px] md:flex md:flex-col md:items-center">
			<div
				className="rounded-[16px] border-[1.4px] border-medinfo-light-2
					shadow-[0_0_0_2px_hsl(0,0%,0%,0.25)] md:flex md:max-w-fit"
			>
				<section
					className="m-6 md:mx-[93px] md:my-11 md:flex md:w-full md:max-w-[460px] md:flex-col
						md:items-center"
				>
					<Logo className="max-lg:h-[46px] max-lg:w-[60px]" />

					<div className="mt-3 flex flex-col items-center gap-8">
						<h1
							className="max-w-[186px] text-center text-[24px] leading-[32px] font-semibold
								text-medinfo-primary-darker md:mx-[42px] md:max-w-[375px] md:text-[48px]
								md:leading-[56px] md:font-bold"
						>
							Join MedInfo Nigeria
						</h1>

						<Form.Root
							methods={methods}
							className="w-full gap-[14px]"
							onSubmit={(event) => void methods.handleSubmit(onSubmit)(event)}
						>
							<Form.Field
								control={control}
								name="firstName"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">First name</Form.Label>

								<Form.InputGroup
									className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 md:h-[64px] md:py-5"
								>
									<Form.InputLeftItem className="size-5 md:size-6">
										<IconBox icon="majesticons:user-line" className="size-full" />
									</Form.InputLeftItem>

									<Form.Input
										type="text"
										placeholder="enter first name"
										className="placeholder:text-medinfo-dark-4 md:text-base"
									/>
								</Form.InputGroup>
							</Form.Field>

							<Form.Field
								control={control}
								name="lastName"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Last name</Form.Label>

								<Form.InputGroup
									className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 md:h-[64px] md:py-5"
								>
									<Form.InputLeftItem className="size-5 md:size-6">
										<IconBox icon="majesticons:user-line" className="size-full" />
									</Form.InputLeftItem>

									<Form.Input
										type="text"
										placeholder="enter last name"
										className="placeholder:text-medinfo-dark-4 md:text-base"
									/>
								</Form.InputGroup>
							</Form.Field>

							<Form.Field control={control} name="email" className="gap-1 font-roboto font-medium">
								<Form.Label className="md:text-[20px]">Email</Form.Label>

								<Form.InputGroup
									className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 md:h-[64px] md:py-5"
								>
									<Form.InputLeftItem className="size-5 md:size-6">
										<IconBox icon="mynaui:envelope" className="size-full" />
									</Form.InputLeftItem>

									<Form.Input
										type="email"
										placeholder="enter email"
										className="placeholder:text-medinfo-dark-4 md:text-base"
									/>
								</Form.InputGroup>
							</Form.Field>

							<Form.Field control={control} name="gender" className="gap-1 font-roboto font-medium">
								<Form.Label className="md:text-[20px]">Gender</Form.Label>

								<Form.FieldController
									render={({ field }) => (
										<Select.Root
											name={field.name}
											value={field.value}
											onValueChange={field.onChange}
										>
											<Select.Trigger
												classNames={{
													base: `group h-[48px] gap-2 rounded-[8px] border-[1.4px]
													border-medinfo-primary-main px-4 font-medium
													data-placeholder:text-medinfo-dark-4 md:h-[64px] md:text-base`,
													icon: `text-medinfo-body-color group-data-[state=open]:rotate-180
													md:size-6`,
												}}
											>
												<Select.Value placeholder="select gender" />
											</Select.Trigger>

											<Select.Content
												classNames={{
													base: `border-[1.4px] border-medinfo-primary-main bg-white/90 p-0
													backdrop-blur-lg`,
													viewport: "gap-1",
												}}
											>
												<Select.Item
													value="Male"
													className="h-[48px] bg-medinfo-light-3 font-medium
														text-medinfo-dark-4 focus:bg-medinfo-light-1
														focus:text-medinfo-body-color
														data-[state=checked]:bg-medinfo-light-1 md:h-[64px] md:text-base"
												>
													Male
												</Select.Item>
												<Select.Item
													value="Female"
													className="h-[48px] bg-medinfo-light-3 font-medium
														text-medinfo-dark-4 focus:bg-medinfo-light-1
														focus:text-medinfo-body-color
														data-[state=checked]:bg-medinfo-light-1 md:h-[64px] md:text-base"
												>
													Female
												</Select.Item>
											</Select.Content>
										</Select.Root>
									)}
								/>
							</Form.Field>

							<Form.Field
								control={control}
								name="country"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Country</Form.Label>

								<Form.FieldController
									render={({ field }) => (
										<Select.Root
											name={field.name}
											value={field.value}
											onValueChange={field.onChange}
										>
											<Select.Trigger
												classNames={{
													base: `group h-[48px] gap-2 rounded-[8px] border-[1.4px]
													border-medinfo-primary-main px-4 font-medium
													data-placeholder:text-medinfo-dark-4 md:h-[64px] md:text-base`,
													icon: `text-medinfo-body-color group-data-[state=open]:rotate-180
													md:size-6`,
												}}
											>
												<Select.Value placeholder="select your country" />
											</Select.Trigger>

											<Select.Content
												classNames={{
													base: `border-[1.4px] border-medinfo-primary-main bg-white/90
													backdrop-blur-lg`,
												}}
											>
												<Select.Item
													withIndicator={false}
													value="Nigeria"
													className="h-[48px] bg-medinfo-light-3 font-medium
														text-medinfo-dark-4 focus:bg-medinfo-light-1
														focus:text-medinfo-body-color
														data-[state=checked]:bg-medinfo-light-1 md:h-[64px] md:text-base"
												>
													Nigeria
												</Select.Item>
												<Select.Item
													withIndicator={false}
													value="Ghana"
													className="h-[48px] bg-medinfo-light-3 font-medium
														text-medinfo-dark-4 focus:bg-medinfo-light-1
														focus:text-medinfo-body-color
														data-[state=checked]:bg-medinfo-light-1 md:h-[64px] md:text-base"
												>
													Ghana
												</Select.Item>
											</Select.Content>
										</Select.Root>
									)}
								/>
							</Form.Field>

							<Show.Root when={user === "doctor"}>
								<Form.Field
									control={control}
									name="specialty"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Specialty</Form.Label>

									<Form.FieldController
										render={({ field }) => (
											<Select.Root
												name={field.name}
												value={field.value}
												onValueChange={field.onChange}
											>
												<Select.Trigger
													classNames={{
														base: `group h-[48px] gap-2 rounded-[8px] border-[1.4px]
														border-medinfo-primary-main px-4 font-medium
														data-placeholder:text-medinfo-dark-4 md:h-[64px] md:text-base`,
														icon: `text-medinfo-body-color group-data-[state=open]:rotate-180
														md:size-6`,
													}}
												>
													<Select.Value placeholder="select your specialty" />
												</Select.Trigger>

												<Select.Content
													classNames={{
														base: `border-[1.4px] border-medinfo-primary-main bg-white/90 p-0
														backdrop-blur-lg`,
													}}
												>
													<Select.Item
														withIndicator={false}
														value="steeze"
														className="h-[48px] bg-medinfo-light-3 font-medium
															text-medinfo-dark-4 focus:bg-medinfo-light-1
															focus:text-medinfo-body-color
															data-[state=checked]:bg-medinfo-light-1 md:h-[64px]
															md:text-base"
													>
														Steeze
													</Select.Item>
													<Select.Item
														withIndicator={false}
														value="cooking"
														className="h-[48px] bg-medinfo-light-3 font-medium
															text-medinfo-dark-4 focus:bg-medinfo-light-1
															focus:text-medinfo-body-color
															data-[state=checked]:bg-medinfo-light-1 md:h-[64px]
															md:text-base"
													>
														Cooking
													</Select.Item>
												</Select.Content>
											</Select.Root>
										)}
									/>
								</Form.Field>
							</Show.Root>

							<Show.Root when={user === "doctor"}>
								<Form.Field
									control={control}
									name="license"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">
										Upload medical license/certificate
									</Form.Label>

									<Form.FieldController
										render={({ field }) => (
											<DropZoneInput
												allowedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
												maxFileSize={4}
												disableFilePickerOpenOnAreaClick={true}
												onChange={field.onChange}
											>
												<DropZone.Area>
													<span className="block shrink-0 md:size-10">
														<IconBox icon="solar:file-send-outline" className="size-full" />
													</span>

													<p
														className="text-[18px] font-medium text-medinfo-primary-darker
															md:text-[20px]"
													>
														Drag files to upload
													</p>

													<p className="text-sm text-medinfo-dark-2">
														Files supported: JPG, PNG, PDF{" "}
													</p>

													<p className="text-sm text-medinfo-dark-2">or</p>

													<DropZone.Trigger asChild={true}>
														<Button size="large">Choose File</Button>
													</DropZone.Trigger>

													<p className="text-sm text-medinfo-dark-2">Maximum size: 4mb</p>
												</DropZone.Area>

												<DropZoneInputImagePreview
													classNames={{
														listContainer: "border-[1.4px] border-medinfo-primary-main",
													}}
												/>
											</DropZoneInput>
										)}
									/>
								</Form.Field>
							</Show.Root>

							<Show.Root when={user === "patient"}>
								<Form.Field control={control} name="dob" className="gap-1 font-roboto font-medium">
									<Form.Label className="md:text-[20px]">Date of Birth</Form.Label>

									<Form.FieldController
										render={({ field }) => (
											<DateTimePicker
												className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
													border-medinfo-primary-main px-4 py-3 text-[14px] md:h-[64px]
													md:py-5 md:text-base"
												dateValueString={field.value}
												placeholder="DD/MM/YYYY"
												onChange={field.onChange}
											/>
										)}
									/>
								</Form.Field>
							</Show.Root>

							<Form.Field
								control={control}
								name="password"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Password</Form.Label>

								<Form.InputGroup
									className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 md:h-[64px] md:py-5"
								>
									<Form.InputLeftItem className="size-5 md:size-6">
										<IconBox icon="mynaui:lock-password" className="size-full" />
									</Form.InputLeftItem>

									<Form.Input
										type="password"
										placeholder="enter password"
										className="placeholder:text-medinfo-dark-4 md:text-base"
									/>
								</Form.InputGroup>
							</Form.Field>

							<Form.Field
								control={control}
								name="confirmPassword"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Confirm password</Form.Label>

								<Form.InputGroup
									className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 md:h-[64px] md:py-5"
								>
									<Form.InputLeftItem className="size-5 md:size-6">
										<IconBox icon="mynaui:lock-password" className="size-full" />
									</Form.InputLeftItem>

									<Form.Input
										type="password"
										placeholder="enter password"
										className="placeholder:text-medinfo-dark-4 md:text-base"
									/>
								</Form.InputGroup>
							</Form.Field>

							<article className="flex flex-col items-center gap-[14px] md:mt-[14px] md:gap-7">
								<Show.Root when={user === "patient"}>
									<p className="font-roboto text-medinfo-dark-4 md:text-[20px]">Or</p>

									<div className="flex gap-8">
										<Button
											size="icon"
											theme="secondary"
											className="rounded-[8px]"
											asChild={true}
										>
											<Link href="https://medinfo-backend-xie7.onrender.com/auth/google">
												<IconBox
													icon="icon-park-outline:google"
													className="size-[18px] lg:size-6"
												/>
											</Link>
										</Button>

										<Button size="icon" theme="secondary" className="rounded-[8px]">
											<IconBox
												icon="basil:facebook-outline"
												className="size-[18px] lg:size-6"
											/>
										</Button>
									</div>
								</Show.Root>

								<Form.SubscribeToFormState
									render={({ isSubmitting }) => (
										<Button
											type="submit"
											isLoading={isSubmitting}
											disabled={isSubmitting}
											isDisabled={false}
										>
											Sign Up
										</Button>
									)}
								/>

								<div className="flex flex-col items-center gap-2">
									<NavLink
										transitionType="regular"
										href={{
											query: { user: user === "doctor" ? "patient" : "doctor" },
										}}
										className="text-medinfo-primary-main md:text-[20px]"
									>
										{user === "doctor" ? "Register as a patient" : "Register as a doctor"}
									</NavLink>

									<p className="md:hidden">
										Already have an account?{" "}
										<NavLink
											transitionType="regular"
											href={{
												pathname: "/signin",
												query: { user: user === "doctor" ? "doctor" : "patient" },
											}}
											className="text-medinfo-primary-main"
										>
											Sign in
										</NavLink>
									</p>
								</div>
							</article>
						</Form.Root>
					</div>
				</section>

				<section
					className="flex w-[432px] flex-col items-center justify-center rounded-r-[16px]
						bg-medinfo-primary-main px-[35px] text-center text-white max-md:hidden xl:shrink-0"
				>
					<h2 className="text-[32px] font-semibold">Hello friend!</h2>

					<p className="mt-6 text-[18px]">
						Enter in your details and lets continue from where you stopped
					</p>

					<Button theme="secondary-inverted" className="mt-[38px]" asChild={true}>
						<NavLink
							href={{
								pathname: "/signin",
								query: { user: user === "doctor" ? "doctor" : "patient" },
							}}
						>
							Sign in
						</NavLink>
					</Button>
				</section>
			</div>
		</Main>
	);
}

export default SignUpPage;
