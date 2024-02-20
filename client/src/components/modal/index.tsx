import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUp } from "lucide-react"

export default function Modal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
                <Button variant="ghost" className="border-2 hover:text-white text-gray-600 border-gray-800 hover:bg-blue-500 rounded-xl py-6 w-full justify-start flex items-center gap-2">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload PDFs
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload PDF</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Upload file</Label>
                        <Input id="picture" type="file" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
