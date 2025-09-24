import Image from "next/image";

const HealthFinderLogo = ({ lastUpdated }: { lastUpdated: string }) => (
	<>
		<div className="mt-7 flex items-center gap-2">
			<p className="font-roboto text-[18px] font-medium text-medinfo-dark-2 italic">Source: </p>

			<a
				className="inline-block h-auto w-[200px]"
				href="https://health.gov/myhealthfinder"
				title="MyHealthfinder"
			>
				<Image
					className="size-full"
					src="https://health.gov/themes/custom/healthfinder/images/MyHF.svg"
					alt="MyHealthfinder"
					width={50}
					height={50}
				/>
			</a>
		</div>

		<p className="font-roboto text-[18px] font-medium text-medinfo-dark-2 italic">
			Last Updated: {lastUpdated}
		</p>
	</>
);

export default HealthFinderLogo;
