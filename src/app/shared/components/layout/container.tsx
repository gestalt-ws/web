import React from "react";
import { cn } from "@/app/shared/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {

}
/**
 * The Container component ensures consistent layout formatting
 * of the main content on each page, thus ensuring each page's main content has
 * the same margins, padding etc...
 *
 * @param className TailwindCSS classes as children.
 * @param ContainerProps interface for props passed into container as children.
 * */
export const Container = ({ className, ...props }: ContainerProps) => {
    return (
        <div
            className={cn("mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-8", className)}
            {...props}
        />
    );
}