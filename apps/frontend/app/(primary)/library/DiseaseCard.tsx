"use client";

import { useDragScroll } from "@zayne-labs/ui-react/ui/drag-scroll";
import Image from "next/image";
import { IconBox, NavLink } from "@/components/common";
import { getElementList } from "@/components/common/for";
import { Button, Card } from "@/components/ui";
import type { Disease, DiseasesResponse } from "@/lib/api/callBackendApi/types";
import { cnJoin } from "@/lib/utils/cn";
import { tipPlaceHolder } from "@/public/assets/images/landing-page";

export type DiseaseCardProps = {
	type: "list" | "grid";
	disease: Disease;
};

export function DiseaseCard({ type, disease }: DiseaseCardProps) {
	return (
		<Card.Root
			as="li"
			className={cnJoin(
				type === "grid" && "relative h-full max-lg:max-h-[176px]",
				type === "list"
					&& "flex w-full gap-[44px] rounded-[16px] border-2 border-medinfo-primary-main p-6"
			)}
		>
			<Card.Header>
				<Image
					className={cnJoin(
						"object-cover",
						type === "grid"
							&& "h-[176px] rounded-[7px] lg:h-[400px] lg:max-w-[368px] lg:rounded-[16px]",
						type === "list" && "size-[68px] rounded-[4px] lg:size-[202px] lg:rounded-[12px]"
					)}
					src={disease.Image}
					alt=""
					priority={true}
					width={type === "grid" ? 161 : 68}
					height={type === "grid" ? 176 : 68}
				/>
			</Card.Header>

			<Card.Content
				className={cnJoin(
					"flex flex-col justify-between",
					type === "grid"
						&& `absolute right-0 bottom-[calc(-95px/2)] h-[95px] w-fit rounded-[16px] border-2
						border-medinfo-primary-main bg-white p-2 lg:bottom-[calc((400px-182px)/2)] lg:h-[182px]
						lg:max-w-[229px] lg:p-6`
				)}
			>
				<div>
					<h4
						className={cnJoin(
							"text-[18px] text-medinfo-primary-main",
							type === "grid" && "font-medium lg:text-[22px]",
							type === "list" && "lg:text-[32px] lg:font-bold"
						)}
					>
						{disease.Disease}
					</h4>

					{type === "list" && (
						<p className="mt-[16px] hidden text-sm text-medinfo-dark-1 lg:block">
							{disease.Description}
						</p>
					)}
				</div>

				{type === "grid" && (
					<p className="hidden text-sm text-medinfo-dark-1 lg:block">
						{disease.Description.slice(0, 40)}...
					</p>
				)}

				<NavLink
					href={`/library/disease/${disease.Disease}`}
					className="inline-flex w-fit items-center gap-[14px] text-medinfo-primary-main lg:gap-4
						lg:text-[20px] lg:font-medium"
				>
					See more
					<IconBox icon="lucide:chevron-right" className="size-5 lg:size-6" />
				</NavLink>
			</Card.Content>
		</Card.Root>
	);
}

type AlternateDiseaseCardProps =
	| {
			type: "list";
			linkToAd: string;
			className?: string;
			disease?: null;
	  }
	| {
			type: "grid";
			disease: Disease;
			className?: string;
			linkToAd?: null;
	  };

export function AlternateDiseaseCard(props: AlternateDiseaseCardProps) {
	const { type, disease, linkToAd, className } = props;

	return (
		<Card.Root
			as="li"
			className={cnJoin(
				type === "grid" && "flex max-w-[161px] shrink-0 flex-col lg:max-w-[340px]",
				type === "list"
					&& `flex w-fit gap-4 rounded-[16px] bg-medinfo-secondary-subtle p-3
					shadow-[0_4px_4px_hsl(0,0%,0%,0.12)] lg:p-6`,
				className
			)}
		>
			<Card.Header className={cnJoin(type === "list" && "content-center")}>
				<Image
					className={cnJoin(
						"object-cover",
						type === "grid" && "h-[132px] rounded-[7.5px] lg:h-[280px] lg:rounded-[16px]",
						type === "list" && "size-[92px] rounded-[6px] lg:size-[120px] lg:rounded-[8px]"
					)}
					src={type === "grid" ? disease.Image : (tipPlaceHolder as string)}
					alt=""
					priority={true}
					width={type === "grid" ? 161 : 92}
					height={type === "grid" ? 132 : 92}
				/>
			</Card.Header>

			<Card.Content
				className={cnJoin(
					"flex h-full flex-col justify-between",
					type === "list" && "max-w-[300px] gap-1 md:max-w-[552px]",
					type === "grid" && "mt-5 gap-2 rounded-[16px] lg:gap-4"
				)}
			>
				<div className="flex justify-between">
					<h4
						className={cnJoin(
							"text-[18px] font-medium",
							type === "list" && "text-medinfo-body-color lg:text-[22px]",
							type === "grid" && "text-medinfo-dark-1 lg:text-[32px] lg:font-semibold"
						)}
					>
						{type === "grid" ? disease.Disease : "Potential Advertisement"}
					</h4>

					{type === "list" && (
						<Button unstyled={true} className="active:scale-[1.02]">
							<IconBox icon="radix-icons:cross-circled" className="size-5" />
						</Button>
					)}
				</div>

				<p
					className={cnJoin(
						"text-xs",
						type === "list" && "text-medinfo-dark-1 lg:text-base lg:leading-[24px]",
						type === "grid" && "text-medinfo-body-color lg:text-[18px] lg:leading-[26px]"
					)}
				>
					{type === "grid" ?
						`${disease.Description.slice(0, 40)}...`
					:	"Lorem ipsum dolor sit amet consectetur. Et a diam adipiscing."}
				</p>

				{type === "list" && (
					<a href={linkToAd} className="w-fit">
						<IconBox icon="akar-icons:link-out" className="size-5 lg:size-6" />
					</a>
				)}

				{type === "grid" && (
					<NavLink
						href={`/library/disease/${disease.Disease}`}
						className="inline-flex w-fit items-center gap-[14px] text-medinfo-primary-main lg:gap-4
							lg:text-[20px]"
					>
						Read post
						<IconBox icon="lucide:chevron-right" className="size-5 lg:size-6" />
					</NavLink>
				)}
			</Card.Content>
		</Card.Root>
	);
}

export function ScrollableAlternateDiseaseCards({
	diseases,
}: {
	diseases: DiseasesResponse["data"]["diseases"];
}) {
	const { getRootProps, getItemProps } = useDragScroll<HTMLUListElement>({
		classNames: {
			base: "flex justify-between gap-5 lg:mt-10",
		},
	});

	const [CardList] = getElementList();

	return (
		<CardList
			{...getRootProps()}
			each={diseases}
			renderItem={(disease, index) => (
				<AlternateDiseaseCard key={index} type="grid" disease={disease} {...getItemProps()} />
			)}
		/>
	);
}
