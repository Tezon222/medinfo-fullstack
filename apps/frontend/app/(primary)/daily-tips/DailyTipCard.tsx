"use client";

import { IconBox, NavLink } from "@/components/common";
import { For } from "@/components/common/for";
import { Card, Carousel } from "@/components/ui";
import { healthTipsQuery } from "@/lib/react-query/queryFactory";
import { cnMerge } from "@/lib/utils/cn";
import type { backendApiSchemaRoutes } from "@medinfo/shared/validation/backendApiSchema";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { z } from "zod";

export type DailyTipCardProps = z.infer<
	(typeof backendApiSchemaRoutes)["@get/health-tips/all"]["data"]
>["data"][number] & {
	className?: string;
};

export function DailyTipCard(props: DailyTipCardProps) {
	const { className, id, imageAlt, imageUrl, title } = props;

	return (
		<Card.Root
			as="li"
			className={cnMerge(
				`flex w-[161px] shrink-0 flex-col rounded-[16px] border-[1.4px] border-medinfo-light-1 pb-3
				max-md:gap-3 md:w-[276px] md:pb-7`,
				className
			)}
		>
			<Card.Header className="h-[117px] md:h-[176px]">
				<Image
					className="h-full rounded-t-[16px] object-cover"
					src={imageUrl}
					alt={imageAlt}
					draggable={false}
					width={161}
					height={117}
				/>
			</Card.Header>

			<Card.Content className="grow px-3 md:p-7">{title}</Card.Content>

			<Card.Footer className="px-3 md:px-7" asChild={true}>
				<NavLink href={`/daily-tips/${id}`} className="flex items-center gap-4">
					Learn More
					<IconBox icon="lucide:chevron-right" className="text-[20px]" />
				</NavLink>
			</Card.Footer>
		</Card.Root>
	);
}

// type ScrollableCardProps = {
// 	result?: CallApiResult<BaseApiSuccessResponse<HealthTipSchemaType[]>, BaseApiErrorResponse>;
// };

export function ScrollableTipCards() {
	const healthTipsQueryResult = useQuery(healthTipsQuery());

	return (
		<Carousel.Root className="mt-6 flex w-full flex-col items-center gap-3.5 lg:gap-10">
			<Carousel.Content className="gap-5 select-none">
				<For
					each={healthTipsQueryResult.data?.data ?? []}
					renderItem={(tip) => (
						<Carousel.Item asChild={true} className="cursor-grab active:cursor-grabbing">
							<DailyTipCard
								key={tip.id}
								id={tip.id}
								imageUrl={tip.imageUrl}
								title={tip.title}
								imageAlt={tip.imageAlt}
							/>
						</Carousel.Item>
					)}
				/>
			</Carousel.Content>
		</Carousel.Root>
	);
}
