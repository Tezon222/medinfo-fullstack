import Image from "next/image";
import { Main } from "@/app/(primary)/-components";
import { AwaitRoot } from "@/components/common/await";
import { ForWithWrapper } from "@/components/common/for";
import { callBackendApi, type SingleTip } from "@/lib/api/callBackendApi";
import { getTipsResponse } from "@/lib/api/callBackendApi/utils";
import { ScrollableTipCards } from "../DailyTipCard";
import HealthFinderLogo from "../HealthFinderLogo";

async function TipExpandedPage({ params }: PageProps<"/daily-tips/[id]">) {
	const { id: tipID } = await params;

	const singleTip = await callBackendApi<SingleTip>(`/dailyTips/tip/${tipID}`);

	const tipsResponsePromise = getTipsResponse();

	if (singleTip.error) {
		console.error(singleTip.error.errorData);
		return null;
	}

	return (
		<Main className="flex w-full flex-col max-md:max-w-[400px]">
			<section className="h-[190px] w-[297px] lg:h-[410px] lg:w-[644px]">
				<Image
					src={singleTip.data.imageUrl}
					className="size-full rounded-tl-[16px] rounded-br-[16px]"
					priority={true}
					width={297}
					height={190}
					alt={singleTip.data.imageAlt}
				/>
			</section>

			<section className="mt-8 flex flex-col gap-6 lg:mt-10 lg:gap-8">
				<h1 className="text-[32px] font-bold text-medinfo-primary-main lg:text-[60px]">
					{singleTip.data.mainTitle}
				</h1>

				<ForWithWrapper
					className="flex flex-col gap-8 lg:gap-[64px]"
					each={singleTip.data.mainBody}
					renderItem={(item) => (
						<li className="flex flex-col gap-4 lg:min-w-[616px] lg:gap-7">
							<h4 className="text-[20px] font-semibold text-medinfo-primary-main lg:text-[24px]">
								{item.Title}
							</h4>

							<div
								className="prose max-w-[80ch] [&>h4]:text-[18px] [&>h4]:font-medium
									[&>h4]:text-medinfo-primary-main [&>p]:text-pretty"
								// eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
								dangerouslySetInnerHTML={{ __html: item.Content }}
							/>
						</li>
					)}
				/>

				<HealthFinderLogo lastUpdated={singleTip.data.lastUpdated} />
			</section>

			<section className="mt-14 flex flex-col items-center lg:mt-[92px]">
				<h2 className="text-center text-[28px] font-bold text-medinfo-primary-main lg:text-[52px]">
					Checkout Other Tips
				</h2>

				<AwaitRoot promise={tipsResponsePromise} asChild={true}>
					<ScrollableTipCards />
				</AwaitRoot>
			</section>
		</Main>
	);
}
export default TipExpandedPage;
