function Page() {
	return (
		<div className="p-[24px] lg:p-[40px]">
			<div className="rounded-[16px] bg-white p-[16px] shadow-md lg:p-[28px]">
				<div className="space-y-[12px]">
					<h1 className="text-medinfo-dark-1 text-[18px] font-medium lg:text-[22px]">
						Notifications
					</h1>
					<p className="text-medinfo-dark-4 text-[14px] font-normal">
						MedInfo Nigeria may still send you important notifications about your account outside of
						your preferred notification settings.
					</p>
				</div>
				<div className="mt-[24px] w-full max-w-[683px] space-y-[24px]">
					<div className="flex justify-between">
						<h2 className="text-medinfo-dark-1 w-[235px] lg:w-auto lg:text-[18px]">
							A doctor answers your questions in the community
						</h2>
						<div className="space-y-[8px]">
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">Yes</label>
							</div>
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">No</label>
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<h2 className="text-medinfo-dark-1 w-[235px] lg:w-auto lg:text-[18px]">
							Updates on a question you asked in the community
						</h2>
						<div className="space-y-[8px]">
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">Yes</label>
							</div>
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">No</label>
							</div>
						</div>
					</div>
					<div className="flex justify-between">
						<h2 className="text-medinfo-dark-1 w-[235px] text-left lg:w-auto lg:text-[18px]">
							A doctor replies your private message
						</h2>
						<div className="space-y-[8px]">
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">Yes</label>
							</div>
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">No</label>
							</div>
						</div>
					</div>

					<div className="flex justify-between">
						<h2 className="text-medinfo-dark-1 w-[235px] text-left lg:w-auto lg:text-[18px]">
							General announcements and offers for you
						</h2>
						<div className="space-y-[8px]">
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">Yes</label>
							</div>
							<div className="flex items-center space-x-[8px]">
								<input type="radio" name="" className="size-[20px] lg:size-[24px]" />
								<label className="text-[14px] lg:text-[16px]">No</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-[32px] rounded-[16px] bg-white p-[28px] shadow-md">
				<div className="space-y-[40px]">
					<h2 className="text-[18px] font-medium lg:text-[22px]">About MedInfo Nigeria</h2>
					<div className="text-medinfo-primary-main space-y-[16px] text-[20px] font-medium">
						<p className="text-[16px] lg:text-[20px]">Terms of use</p>
						<hr className="w-full" />
						<p className="text-[16px] lg:text-[20px]">Privacy policy</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
