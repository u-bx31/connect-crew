import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTemp = () => {
	return (
		<div className="flex items-start space-x-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<div className="flex flex-col gap-1 pt-1">
					<Skeleton className="h-2 w-[50px] xs:w-[70px] sm:w-[80px] lg:w-[100px]" />
					<Skeleton className="h-2 w-[30px] xs:w-[40px] sm:w-[50px] lg:w-[80px]" />
				</div>
				<Skeleton className="h-3 w-[90px] xs:w-[160px] sm:w-[200px] lg:w-[270px]" />
				<Skeleton className="h-3 w-[70px] xs:w-[120px] sm:w-[150px] lg:w-[250px]" />
			</div>
		</div>
	);
};

export default SkeletonTemp;
