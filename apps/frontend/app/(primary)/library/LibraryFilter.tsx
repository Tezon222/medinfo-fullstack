"use client";

import { IconBox } from "@/components/common";
import { getElementList } from "@/components/common/for";
import { SearchIcon } from "@/components/icons";
import { DropdownMenu } from "@/components/ui";
import type { DiseasesResponse } from "@/lib/api/callBackendApi/types";
import { cnJoin } from "@/lib/utils/cn";
import { useState } from "react";
import { DiseaseCard } from "./DiseaseCard";

function LibraryFilter({ diseases }: { diseases: DiseasesResponse["data"]["diseases"] }) {
	const [filter, setFilter] = useState<"grid" | "list">("grid");
	const [CardList] = getElementList();

	return (
		<>
			<section className="flex h-[48px] justify-center gap-5 lg:h-[64px] lg:gap-8">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						className="border-medinfo-primary-main data-placeholder:text-medinfo-dark-4 group flex
							h-full w-[116px] items-center justify-between gap-2 rounded-[8px] border-[1.4px] px-4
							font-medium lg:w-[220px]"
					>
						<p className="text-sm font-medium md:text-base">{filter}</p>

						<IconBox
							icon="lucide:chevron-down"
							className="text-medinfo-body-color size-5 group-data-[state=open]:rotate-180
								md:size-6"
						/>
					</DropdownMenu.Trigger>

					<DropdownMenu.Content
						className="border-medinfo-primary-main grid gap-1 border-[1.4px] bg-white/90
							backdrop-blur-lg"
						align="start"
					>
						<DropdownMenu.RadioGroup
							value={filter}
							onValueChange={(value: string) => setFilter(value as typeof filter)}
						>
							<DropdownMenu.RadioItem
								withIndicator={false}
								value="grid"
								className="bg-medinfo-light-3 text-medinfo-dark-4 focus:text-medinfo-body-color
									data-[state=checked]:bg-medinfo-light-1 h-[48px] font-medium focus:text-base
									md:h-[64px] md:text-base md:focus:text-[18px]"
							>
								grid
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem
								withIndicator={false}
								value="list"
								className="bg-medinfo-light-3 text-medinfo-dark-4 focus:text-medinfo-body-color
									data-[state=checked]:bg-medinfo-light-1 h-[48px] font-medium focus:text-base
									md:h-[64px] md:text-base md:focus:text-[18px]"
							>
								list
							</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<form
					className="border-medinfo-primary-main focus-within:ring-medinfo-primary-lighter
						focus-visible:outline-hidden flex h-full items-center gap-[18px] rounded-lg
						border-[1.4px] bg-white px-4 focus-within:ring-2 lg:w-[500px]"
				>
					<SearchIcon type="green" className="size-5 shrink-0 lg:size-6" />

					<input
						type="search"
						placeholder="search..."
						className="font-roboto outline-hidden placeholder:text-medinfo-dark-4 w-full text-sm
							font-medium placeholder:font-medium md:text-base"
					/>
				</form>
			</section>

			<section>
				<CardList
					className={cnJoin(
						"grid w-full gap-y-6 lg:gap-y-12",
						filter === "grid"
							&& "auto-rows-[225px] grid-cols-2 gap-x-4 lg:auto-rows-[400px] lg:gap-x-7"
					)}
					each={diseases}
					renderItem={(disease, index) => <DiseaseCard key={index} type={filter} disease={disease} />}
				/>
			</section>
		</>
	);
}
export default LibraryFilter;
