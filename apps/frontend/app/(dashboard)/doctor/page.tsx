import CalendarIcon from "@/components/icons/CalendarIcon";
import DollarSignIcon from "@/components/icons/DollarSignIcon";
import NextIcon from "@/components/icons/NextIcon";
import PatientIcon from "@/components/icons/PatientIcon";

function DoctorPage() {
	return (
		<div className="p-[24px] lg:p-[40px]">
			<div className="flex max-h-[402px] w-full flex-col gap-[40px] lg:flex-row">
				<div className="w-full space-y-[27px] lg:max-w-[338px]">
					<div className="flex gap-[16px] rounded-[16px] bg-white p-[28px] shadow-md">
						<div className="rounded-[8px] bg-[#F0FDF6] p-[8px]">
							<DollarSignIcon />
						</div>
						<div className="space-y-[6px]">
							<p className="text-medinfo-dark-3 font-normal">Net income</p>
							<h2 className="text-medinfo-dark-1 text-[22px] font-medium">$ 1200</h2>
						</div>
					</div>

					<div className="flex gap-[16px] rounded-[16px] bg-white p-[28px] shadow-md">
						<div className="rounded-[8px] bg-[#EFF4FB] p-[8px]">
							<PatientIcon />
						</div>
						<div className="space-y-[6px]">
							<p className="text-medinfo-dark-3 font-normal">Number of patients</p>
							<h2 className="text-medinfo-dark-1 text-[22px] font-medium">890</h2>
						</div>
					</div>

					<div className="flex gap-[16px] rounded-[16px] bg-white p-[28px] shadow-md">
						<div className="rounded-[8px] bg-[#F8F5DB] p-[8px]">
							<CalendarIcon />
						</div>
						<div className="space-y-[6px]">
							<p className="text-medinfo-dark-3 font-normal">Total appointments</p>
							<h2 className="text-medinfo-dark-1 text-[22px] font-medium">65</h2>
						</div>
					</div>
				</div>
				<div className="w-full rounded-[16px] bg-white p-[28px] shadow-md">
					<div className="flex items-center justify-between">
						<h2 className="text-[22px] font-medium">Overall activity</h2>
						<div>
							<p className="font-normal">2023</p>
						</div>
					</div>
					<div>{/* <Image src={ChartImage} height={} alt="chart"/> */}</div>
				</div>
			</div>
			<div className="mt-[32px] flex flex-col gap-[40px] lg:flex-row">
				<div className="w-full rounded-[16px] bg-white p-[16px] shadow-md lg:p-[32px]">
					<div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
						<h2 className="text-[18px] font-medium lg:text-[22px]">Today’s appointment</h2>
						<p className="text-[14px] font-normal">18th Febraury, 2023</p>
					</div>
					<div className="mt-[12px] flex items-center gap-[16px]">
						<p className="font-medium lg:text-[20px]">See all</p>
						<NextIcon />
					</div>
					<div className="mt-[24px] space-y-[12px]">
						<div
							className="border-medinfo-secondary-main flex w-full justify-between rounded-[8px]
								border border-solid px-[20px] py-[16px]"
						>
							<div className="flex gap-[12px]">
								<div className="size-[56px] rounded-full bg-gray-500" />
								<div className="space-y-[12px]">
									<h2 className="text-medinfo-primary-darker text-[18px] font-semibold">
										Alex.O
									</h2>
									<p className="text-[14px] font-normal">Men's health</p>
								</div>
							</div>
							<div>
								<h2>09:00</h2>
							</div>
						</div>

						<div
							className="border-medinfo-secondary-main flex w-full justify-between rounded-[8px]
								border border-solid px-[20px] py-[16px]"
						>
							<div className="flex gap-[12px]">
								<div className="size-[56px] rounded-full bg-gray-500" />
								<div className="space-y-[12px]">
									<h2 className="text-medinfo-primary-darker text-[18px] font-semibold">
										Alex.O
									</h2>
									<p className="text-[14px] font-normal">Men's health</p>
								</div>
							</div>
							<div>
								<h2>09:00</h2>
							</div>
						</div>

						<div
							className="border-medinfo-secondary-main flex w-full justify-between rounded-[8px]
								border border-solid px-[20px] py-[16px]"
						>
							<div className="flex gap-[12px]">
								<div className="size-[56px] rounded-full bg-gray-500" />
								<div className="space-y-[12px]">
									<h2 className="text-medinfo-primary-darker text-[18px] font-semibold">
										Alex.O
									</h2>
									<p className="text-[14px] font-normal">Men's health</p>
								</div>
							</div>
							<div>
								<h2>09:00</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full rounded-[16px] bg-white p-[16px] shadow-md lg:p-[32px]">
					<div className="flex items-center justify-between">
						<h2 className="text-[18px] font-medium lg:text-[22px]">Appointment requests</h2>
					</div>
					<div className="mt-[12px] flex items-center gap-[16px]">
						<p className="font-medium lg:text-[20px]">See all</p>
						<NextIcon />
					</div>
					<div className="mt-[24px] space-y-[12px]">
						<div
							className="border-medinfo-secondary-main flex w-full justify-between rounded-[8px]
								border border-solid px-[20px] py-[16px]"
						>
							<div className="flex gap-[12px]">
								<div className="size-[56px] rounded-full bg-gray-500" />
								<div className="space-y-[12px]">
									<h2 className="text-medinfo-primary-darker text-[18px] font-semibold">
										Alex.O
									</h2>
									<p className="text-[14px] font-normal">Men's health</p>
								</div>
							</div>
							<div>
								<h2>09:00</h2>
							</div>
						</div>

						<div
							className="border-medinfo-secondary-main flex w-full justify-between rounded-[8px]
								border border-solid px-[20px] py-[16px]"
						>
							<div className="flex gap-[12px]">
								<div className="size-[56px] rounded-full bg-gray-500" />
								<div className="space-y-[12px]">
									<h2 className="text-medinfo-primary-darker text-[18px] font-semibold">
										Alex.O
									</h2>
									<p className="text-[14px] font-normal">Men's health</p>
								</div>
							</div>
							<div>
								<h2>09:00</h2>
							</div>
						</div>

						<div
							className="border-medinfo-secondary-main flex w-full justify-between rounded-[8px]
								border border-solid px-[20px] py-[16px]"
						>
							<div className="flex gap-[12px]">
								<div className="size-[56px] rounded-full bg-gray-500" />
								<div className="space-y-[12px]">
									<h2 className="text-medinfo-primary-darker text-[18px] font-semibold">
										Alex.O
									</h2>
									<p className="text-[14px] font-normal">Men's health</p>
								</div>
							</div>
							<div>
								<h2>09:00</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DoctorPage;
