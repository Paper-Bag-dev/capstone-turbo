import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import React from "react";

interface Props {
  title: string;
  desc: string;
  icon: React.ReactElement;
  val: string;
  footer: string;
}

const CustomCard = ({
  title,
  desc,
  icon,
  val,
  footer
}: Props) => {
  return (
    <Card className="w-full h-[12rem]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
        {icon}
      </CardHeader>
      <CardContent className="flex items-start ">
        <div className="text-3xl font-semibold">{val}</div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">{footer}</p>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
