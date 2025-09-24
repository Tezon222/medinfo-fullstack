import Image from "next/image";
import { Main } from "@/app/(primary)/-components";
import { getElementList } from "@/components/common/for";
import { callBackendApi } from "@/lib/api/callBackendApi";
import type { DiseasesResponse, SingleDisease } from "@/lib/api/callBackendApi/types";
import { AlternateDiseaseCard, ScrollableAlternateDiseaseCards } from "../../DiseaseCard";

async function TipDetailsPage(props: { params: Promise<{ name: string }> }) {
	// eslint-disable-next-line react/prefer-destructuring-assignment
	const params = await props.params;

	const [singleDisease, allDiseases] = await Promise.all([
		callBackendApi<SingleDisease>("/diseases/oneDisease", {
			query: { name: decodeURIComponent(params.name) },
		}),
		callBackendApi<DiseasesResponse>("/diseases/allDiseases"),
	]);

	if (singleDisease.error) {
		console.error(singleDisease.error.errorData);
		return null;
	}

	if (allDiseases.error) {
		console.error(allDiseases.error.errorData);
	}

	const [List] = getElementList();

	return (
		<Main className="flex w-full flex-col">
			<section className="lg:flex lg:gap-16">
				<Image
					className="size-[272px] rounded-tl-[16px] rounded-br-[16px] lg:size-[460px]"
					src={singleDisease.data.data.Image}
					alt=""
					priority={true}
					width={272}
					height={272}
				/>

				<section
					id="Ads"
					className="scrollbar-hidden hidden max-h-[460px] overflow-auto lg:flex lg:flex-col lg:gap-2"
				>
					<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
					<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
					<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
				</section>
			</section>

			<section className="mt-5 flex flex-col gap-5 lg:mt-10">
				<h1
					className="text-[32px] font-semibold text-medinfo-primary-darker lg:text-[52px]
						lg:font-bold"
				>
					{singleDisease.data.data.Disease}
				</h1>

				<p className="text-[18px]">{singleDisease.data.data.Description}</p>

				<article>
					<h4>Symptoms</h4>
					<List
						className="pl-12"
						each={singleDisease.data.data.Symptoms}
						renderItem={(symptom) => (
							<li key={symptom} className="list-['-_']">
								{symptom}
							</li>
						)}
					/>
				</article>

				<article>
					<h4>Precautions</h4>
					<List
						className="pl-12"
						each={singleDisease.data.data.Precautions}
						renderItem={(precaution) => (
							<li key={precaution} className="list-['-_']">
								{precaution}
							</li>
						)}
					/>
				</article>
			</section>

			<section id="Ads" className="mt-14 flex flex-col gap-2 lg:hidden">
				<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
				<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
				<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
			</section>

			<section id="Related Posts" className="mt-14 w-full lg:mt-[92px]">
				<h2 className="text-[48px] font-bold text-medinfo-primary-darker max-lg:hidden">
					Related Posts
				</h2>

				{allDiseases.data && (
					<ScrollableAlternateDiseaseCards diseases={allDiseases.data.data.diseases} />
				)}
			</section>
		</Main>
	);
}
export default TipDetailsPage;
