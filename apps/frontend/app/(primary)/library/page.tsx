import { notFound } from "next/navigation";
import { Main } from "@/app/(primary)/-components";
import { NavLink } from "@/components/common";
import { callBackendApi } from "@/lib/api/callBackendApi";
import type { DiseasesResponse } from "@/lib/api/callBackendApi/types";
import LibraryFilter from "./LibraryFilter";

async function LibraryPage() {
	const allDiseases = await callBackendApi<DiseasesResponse>("/diseases/allDiseases", {
		query: {
			limit: 6,
		},
	});

	if (allDiseases.error) {
		console.error(allDiseases.error.errorData);
		return notFound();
	}

	return (
		<Main className="flex w-full flex-col gap-6 max-lg:max-w-[400px] md:px-6 lg:gap-9 lg:px-[100px]">
			<section className="grid gap-3 text-center lg:gap-6">
				<h1 className="text-medinfo-primary-darker text-[22px] font-medium lg:text-[48px] lg:font-bold">
					Ailment Archive
				</h1>

				<p className="mx-auto max-w-[747px] text-sm lg:text-[18px]">
					Visit our free and extensive Library to find information on various diseases, conditions to
					empower yourself with knowledge and make informed health decisions
				</p>
			</section>

			<LibraryFilter diseases={allDiseases.data.data.diseases} />

			<section className="flex justify-center">
				<NavLink
					href="#"
					transitionType="regular"
					className="text-medinfo-primary-main inline-block text-center lg:text-[20px] lg:font-medium"
				>
					More results ...({allDiseases.data.data.totalDiseases})
				</NavLink>
			</section>
		</Main>
	);
}

export default LibraryPage;
