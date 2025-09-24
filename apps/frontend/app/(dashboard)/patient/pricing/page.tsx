import { IconBox } from "@/components/common";
import { getElementList } from "@/components/common/for";
import { Button, Card } from "@/components/ui";
import { cnJoin, tw } from "@/lib/utils/cn";
import { Main } from "../../-components";

const pricing = [
	{
		title: "FREE",
		banner: { title: "active", className: tw`bg-medinfo-primary-subtle` },
		prices: null,
		features: [
			"Limited comments in community chat",
			"No direct messages to doctors",
			"No appointments with doctors",
		],
	},
	{
		title: "TIER 2",
		banner: null,
		prices: ["₦54, 000/year", "₦4, 600/month"],
		features: [
			"Unlimited comments in community chat",
			"Direct messages to doctors",
			"Limited appointments",
		],
	},
	{
		title: "TIER 3",
		banner: { title: "recommended", className: tw`border-medinfo-light-1 border bg-white` },
		prices: ["₦82, 000/year", "₦7, 000/month"],
		features: [
			"Unlimited comments in community chat",
			"Direct messages to doctors and video calls",
			"Unlimited appointments",
		],
	},
] satisfies PricingCardProps[];

function PricingPage() {
	const [PricingCardList] = getElementList();

	return (
		<Main className="w-full gap-8 max-md:mx-auto max-md:max-w-[400px] md:gap-12">
			<header className="flex flex-col gap-3">
				<h1 className="text-medinfo-dark-1 text-[32px] font-semibold">
					Go Premium. Choose your plan!
				</h1>

				<p className="text-medinfo-dark-4 text-[18px] font-medium">
					Go premium and get access to more medical goodies.
				</p>
			</header>

			<PricingCardList
				as="div"
				className="flex flex-col gap-9 md:flex-row"
				each={pricing}
				renderItem={(item) => <PricingCard key={item.title} {...item} />}
			/>
		</Main>
	);
}

type PricingCardProps = {
	title: string;
	prices: [yearly: string, monthly: string] | null;
	banner: { title: "active" | "recommended"; className: string } | null;
	features: string[];
};

function PricingCard(props: PricingCardProps) {
	const { title, prices, banner, features } = props;

	const [For] = getElementList("base");

	const hasGetStartedButton = !banner || banner.title !== "active";

	return (
		<Card.Root
			className={cnJoin(
				`border-medinfo-light-1 relative flex min-h-[436px] max-w-[342px] flex-col justify-between
				rounded-[16px] border bg-white p-6
				shadow-[0_4px_4px_hsl(152,17%,79%,0.12),_0_4px_4px_hsl(152,17%,79%,0.12)]`,
				banner
					&& `max-md:mt-(--half-banner-height) [--banner-height:29px]
					[--half-banner-height:calc(var(--banner-height)/2)]`
			)}
		>
			{banner && (
				<span
					className={cnJoin(
						`text-medinfo-primary-main absolute top-[calc(var(--half-banner-height)*-1)] inline-block
						w-fit self-center rounded-[32px] px-3 py-1 text-[14px]`,
						banner.className
					)}
				>
					{banner.title}
				</span>
			)}

			<div className="flex flex-col gap-9">
				<Card.Header className="flex justify-between">
					<Card.Title className="text-medinfo-primary-main text-[18px] font-medium">
						{title}
					</Card.Title>

					{prices && (
						<Card.Description
							className="text-medinfo-primary-main flex flex-col items-end gap-0.5 text-[20px]
								font-medium"
						>
							<For each={prices} renderItem={(item) => <span key={item}>{item}</span>} />
						</Card.Description>
					)}
				</Card.Header>

				<Card.Content as="ul" className="flex flex-col gap-3.5">
					<For
						each={features}
						renderItem={(feature) => (
							<li key={feature} className="flex gap-1">
								<span className="flex size-6 items-center justify-center">
									<IconBox icon="material-symbols:check-rounded" className="size-3" />
								</span>

								<p className="text-medinfo-primary-main">{feature}</p>
							</li>
						)}
					/>
				</Card.Content>
			</div>

			{hasGetStartedButton && (
				<Card.Footer>
					<Button size="full-width">Get started</Button>
				</Card.Footer>
			)}
		</Card.Root>
	);
}

export default PricingPage;
