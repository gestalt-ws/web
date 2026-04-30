import { FileTable } from "@/app/files/components/file-table";
import { Container } from "@/app/shared/components/layout/container";

/*
* Displays file metadata. The view where users can upload, download, edit files etc...
* */
export function Files() {
    return (
        <div className={"flex flex-1 flex-col"}>
            <Container>
                <FileTable />
            </Container>
        </div>
    );
}