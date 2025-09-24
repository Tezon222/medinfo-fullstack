"use client";
// FIXME - Change accordions component to another suitable one and then remove use client from this page`

import { For } from "@/components/common/for";
import { ChevronDownIcon } from "@/components/icons";
import { Accordion } from "@/components/ui";

const FAQs = [
	{
		answer:
			"MedInfo Nigeria is an online platform that provides access to reliable health information and connects users with certified doctors for consultations.",
		question: "What is MedInfo Nigeria?",
	},
	{
		answer:
			"Yes, accessing our health information library is free. However, consultations with healthcare professionals may require payment.",
		question: "Is the platform free to use?",
	},
	{
		answer:
			"Simply sign up, select a specialist or sub-specialist, and book a virtual consultation through our platform.",
		question: "How do I consult a doctor?",
	},
	{
		answer:
			"Absolutely! Our platform is available 24/7, so you can access health information or consult a doctor whenever you need.",
		question: "Can I use MedInfo Nigeria at any time?",
	},
	{
		answer:
			"Yes, all doctors and healthcare professionals on MedInfo Nigeria are verified and certified to ensure you receive trustworthy advice.",
		question: "Are the doctors on the platform certified?",
	},
];

function AccordionFaqs() {
	return (
		<Accordion.Root
			type="single"
			className="mt-6 flex w-full flex-col gap-2 md:mt-14 md:gap-4"
			collapsible={true}
		>
			<For
				each={FAQs}
				renderItem={(FAQ) => (
					<Accordion.Item
						key={FAQ.question}
						value={FAQ.answer}
						className="border-medinfo-primary-darker w-full rounded-[16px] border"
					>
						<Accordion.Trigger
							withIcon={false}
							classNames={{
								base: `text-medinfo-primary-main px-6 py-[15px] text-[22px] md:p-6 md:text-[32px]
								md:font-semibold`,
							}}
						>
							<p className="text-pretty text-left">{FAQ.question}</p>

							<span
								data-icon="true"
								className="bg-medinfo-primary-main flex items-center justify-center rounded-full
									p-[10px] md:p-4"
							>
								<ChevronDownIcon className="size-4 md:size-6" />
							</span>
						</Accordion.Trigger>

						<Accordion.Content
							className="border-medinfo-primary-darker flex flex-col gap-4 px-6 pb-[15px] md:pb-6"
						>
							<hr className="bg-medinfo-secondary-main h-[2px] border-none" />

							<p>{FAQ.answer}</p>
						</Accordion.Content>
					</Accordion.Item>
				)}
			/>
		</Accordion.Root>
	);
}

export default AccordionFaqs;
