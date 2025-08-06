"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Row } from "@tanstack/react-table";
import { Edit, Plus, X } from "lucide-react";
import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { AsyncButton } from "@/components/common/async-button";
import EmptyData from "@/components/common/empty-data";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { IMember } from "@/features/overview";
import { MEMBER_ROLE, MEMBER_STATUS } from "@/features/overview";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { MemberRoleBadge } from "./member-role-badge";
import { MemberStatusBadge } from "./member-status-badge";

const updateMemberSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.email("Invalid email address"),
    avatar: z.url("Invalid avatar URL").optional().or(z.literal("")),
    role: z.enum(Object.values(MEMBER_ROLE), {
        message: "Role is required",
    }),
    status: z.enum(Object.values(MEMBER_STATUS), {
        message: "Status is required",
    }),
    department: z.string().min(1, "Department is required"),
    skills: z
        .array(
            z.object({
                value: z.string().min(1, "Skill cannot be empty"),
            }),
        )
        .optional(),
});

type UpdateMemberFormData = z.infer<typeof updateMemberSchema>;

interface IUpdateMemberDialogProps
    extends ComponentPropsWithoutRef<typeof Dialog> {
    showTrigger?: boolean;
    member: Row<IMember>["original"] | null;
    updateMember?: (id: string, data: Partial<IMember>) => void;
    isUpdatingMember?: boolean;
    updateMemberError?: Error | null;
}

export function UpdateMemberDialog({
    showTrigger = true,
    member,
    updateMember,
    isUpdatingMember,
    updateMemberError,
    ...props
}: IUpdateMemberDialogProps) {
    const isMobile = useIsMobile();
    const isUpdating = useRef(false);

    const form = useForm<UpdateMemberFormData>({
        resolver: zodResolver(updateMemberSchema),
        defaultValues: {
            name: "",
            email: "",
            avatar: "",
            role: MEMBER_ROLE.MEMBER,
            status: MEMBER_STATUS.ACTIVE,
            department: "",
            skills: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "skills",
    });

    useEffect(() => {
        if (member) {
            form.reset({
                name: member.name || "",
                email: member.email || "",
                avatar: member.avatar || "",
                role: member.role || MEMBER_ROLE.MEMBER,
                status: member.status || MEMBER_STATUS.ACTIVE,
                department: member.department || "",
                skills: member.skills?.map((skill) => ({ value: skill })) || [],
            });
        }
    }, [member, form]);

    useEffect(() => {
        if (isUpdatingMember) {
            isUpdating.current = true;
        }
        if (!isUpdatingMember && isUpdating.current) {
            isUpdating.current = false;
            props.onOpenChange?.(false);
            form.reset();
        }
    }, [isUpdatingMember, props.onOpenChange, form]);

    useEffect(() => {
        if (!props.open) {
            form.reset();
        }
    }, [props.open, form]);

    const handleSubmit = (data: UpdateMemberFormData) => {
        if (member && updateMember) {
            const transformedData = {
                ...data,
                skills: data.skills?.map((skill) => skill.value) || [],
            };
            updateMember(member.id, transformedData);
        }
    };

    const handleCancel = () => {
        form.reset();
        props.onOpenChange?.(false);
    };

    const addSkill = () => {
        append({ value: "" });
    };

    if (!member) return null;

    const FormContent = () => (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="space-y-3">
                    <p className="font-medium text-lg">Basic Information</p>

                    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter member name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Avatar URL (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com/avatar.jpg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

             
                <div className="space-y-3">
                    <p className="font-medium text-lg">Role & Status</p>

                    <div className="gap-4 grid grid-cols-1 sm:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(MEMBER_ROLE).map((role) => (
                                                <SelectItem key={role} value={role}>
                                                    <MemberRoleBadge role={role} />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(MEMBER_STATUS).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    <MemberStatusBadge status={status} />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter department" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-lg">Skills</p>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addSkill}
                        >
                            <Plus className="mr-2 size-4" />
                            Add Skill
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name={`skills.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <Input placeholder="Enter skill" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => remove(index)}
                                >
                                    <X className="size-4" />
                                </Button>
                            </div>
                        ))}
                        {fields.length === 0 && (
                            <EmptyData message={`No skills added yet. Click "Add Skill" to get started.`} iconClassName="size-8" messageClassName="text-sm" />
                        )}
                    </div>
                </div>

                {updateMemberError && (
                    <div className="bg-destructive/15 p-3 rounded-md">
                        <p className="text-destructive text-sm">
                            {updateMemberError.message || "Failed to update member"}
                        </p>
                    </div>
                )}
            </form>
        </Form>
    );

    if (isMobile) {
        return (
            <Drawer {...props}>
                {showTrigger ? (
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Edit className="mr-2 size-4" aria-hidden="true" />
                            Edit
                        </Button>
                    </DrawerTrigger>
                ) : null}
                <DrawerContent className="max-h-[95vh]">
                    <DrawerHeader>
                        <DrawerTitle>Update Member</DrawerTitle>
                        <DrawerDescription>
                            Update the information for{" "}
                            <span className="font-medium">{member.name}</span>
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-3 pb-3 overflow-y-auto">
                        <FormContent />
                    </div>
                    <DrawerFooter className="gap-2 sm:space-x-0">
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </DrawerClose>
                        <AsyncButton
                            aria-label="Update"
                            onClick={form.handleSubmit(handleSubmit)}
                            isLoading={isUpdatingMember}
                        >
                            {isUpdatingMember ? "Updating..." : "Update"}
                        </AsyncButton>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog {...props}>
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Edit className="mr-2 size-4" aria-hidden="true" />
                        Edit
                    </Button>
                </DialogTrigger>
            ) : null}
            <DialogContent className="min-w-2xl max-w-4xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Update Member</DialogTitle>
                    <DialogDescription>
                        Update the information for{" "}
                        <span className="font-medium">{member.name}</span>
                    </DialogDescription>
                </DialogHeader>
                <FormContent />
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <AsyncButton
                        aria-label="Update"
                        onClick={form.handleSubmit(handleSubmit)}
                        isLoading={isUpdatingMember}
                    >
                        {isUpdatingMember ? "Updating..." : "Update"}
                    </AsyncButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
