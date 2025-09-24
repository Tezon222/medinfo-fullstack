"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Page() {
	const router = useRouter();

	const handleNavigation = (slug: string) => {
		router.push(`/patient/${slug}`);
	};

	const activityLogs = [
		{ id: 1, title: "Children's health" },
		{ id: 2, title: "Children's car" },
		{ id: 3, title: "Children's car" },
		{ id: 4, title: "Children's car" },
		{ id: 5, title: "Children's car" },
		{ id: 6, title: "Children's car" },
		{ id: 7, title: "Children's car" },
	];

	const cardData = [
		{ id: 1, slug: "Primary care appointment", price: "$0 - $120" },
		{ id: 2, slug: "Primary care appointment", price: "$0 - $120" },
		{ id: 3, slug: "Primary care appointment", price: "$0 - $120" },
		{ id: 4, slug: "Primary care appointment", price: "$0 - $120" },
		{ id: 5, slug: "Primary care appointment", price: "$0 - $120" },
		{ id: 6, slug: "Primary care appointment", price: "$0 - $120" },
	];

	const renderActivityLogs = () =>
		activityLogs.map((log, index) => (
			<div key={log.id} className="flex gap-[34px] font-normal">
				<h2 className="size-[29px]">{index + 1}</h2>
				<h2>{log.title}</h2>
			</div>
		));

	const renderCards = () =>
		cardData.map((card) => (
			<div
				key={card.id}
				className="border-medinfo-secondary-main flex items-start gap-[12px] rounded-[8px] border
					border-solid p-[16px] lg:px-[27px] lg:py-[28px]"
				onClick={() => handleNavigation(card.slug)}
			>
				<div className="size-[64px]">
					<Image
						src="/assets/images/dashboard/Frame 2609432.png"
						width={64}
						height={64}
						alt="product"
					/>
				</div>
				<div className="flex-1 space-y-[8px]">
					<h2 className="text-[18px] font-medium lg:text-[20px]">{card.slug}</h2>
					<p className="text-medinfo-dark-2 text-[14px] lg:text-[16px]">
						Lorem ipsum dolor sit amet consectetur. Massa nec imperdiet neque ut.
					</p>
					<p className="text-medinfo-dark-1 text-[14px] font-semibold">{card.price}</p>
				</div>
			</div>
		));

	return (
		<div className="p-[24px] lg:p-[40px]">
			<div className="flex max-h-[402px] w-full flex-col gap-[40px] lg:flex-row">
				<div className="w-full rounded-[16px] bg-white p-[16px] shadow-md lg:p-[28px]">
					<div className="flex items-center justify-between">
						<h2 className="text-[22px] font-medium">Overall activity</h2>
						<div>
							<p className="font-normal">2023</p>
						</div>
					</div>
					<div>{/* <Image src={ChartImage} height={} alt="chart"/> */}</div>
				</div>
				<div className="w-full rounded-[16px] bg-white p-[16px] shadow-md lg:max-w-[338px] lg:p-[28px]">
					<h2 className="text-medinfo-dark-1 text-[22px] font-medium">Activities</h2>
					<div className="border-medinfo-secondary-main mt-[12px] rounded-[8px] border border-solid">
						<div
							className="bg-medinfo-secondary-main text-medinfo-dark-1 flex gap-[34px]
								rounded-t-[8px] py-[8px] pl-[8px] font-semibold"
						>
							<h2>S/N</h2>
							<h2>Log</h2>
						</div>
						<div className="h-auto max-h-[296px] overflow-y-hidden pl-[8px]">
							<div className="flex flex-col">{renderActivityLogs()}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-[32px] w-full rounded-[16px] bg-white p-[16px] shadow-md lg:p-[32px]">
				<div className="grid grid-cols-1 gap-[40px] lg:grid-cols-2">{renderCards()}</div>
			</div>
		</div>
	);
}

export default Page;
