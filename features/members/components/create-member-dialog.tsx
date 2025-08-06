"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
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

const createMemberSchema = z.object({
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

type CreateMemberFormData = z.infer<typeof createMemberSchema>;

interface ICreateMemberDialogProps {
    showTrigger?: boolean;
    createMember?: (data: Omit<IMember, 'id'>) => void;
    isCreatingMember?: boolean;
    createMemberError?: Error | null;
}

export function CreateMemberDialog({
    showTrigger = true,
    createMember,
    isCreatingMember,
    createMemberError,
}: ICreateMemberDialogProps) {
    const isMobile = useIsMobile();
    const isCreating = useRef(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<CreateMemberFormData>({
        resolver: zodResolver(createMemberSchema),
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
        if (isCreatingMember) {
            isCreating.current = true;
        }
        if (!isCreatingMember && isCreating.current) {
            isCreating.current = false;
            setIsOpen(false);
            form.reset();
        }
    }, [isCreatingMember, form]);

    useEffect(() => {
        if (!isOpen) {
            form.reset();
        }
    }, [isOpen, form]);

    const handleSubmit = (data: CreateMemberFormData) => {
        if (createMember) {
            const transformedData = {
                ...data,
                avatar: data.avatar || "",
                skills: data.skills?.map((skill) => skill.value) || [],
                joinedAt: new Date().toISOString(),
                currentTasksCount: 0,
                completedTasksCount: 0,
                workload: 0,
            };
            createMember(transformedData);
        }
    };

    const handleCancel = () => {
        form.reset();
        setIsOpen(false);
    };

    const addSkill = () => {
        append({ value: "" });
    };

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
                            <EmptyData
                                message={`No skills added yet. Click "Add Skill" to get started.`}
                                iconClassName="size-8"
                                messageClassName="text-sm"
                            />
                        )}
                    </div>
                </div>

                {createMemberError && (
                    <div className="bg-destructive/15 p-3 rounded-md">
                        <p className="text-destructive text-sm">
                            {createMemberError.message || "Failed to create member"}
                        </p>
                    </div>
                )}
            </form>
        </Form>
    );

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                {showTrigger ? (
                    <DrawerTrigger asChild>
                        <Button>
                            <Plus className="mr-2 size-4" aria-hidden="true" />
                            Add Member
                        </Button>
                    </DrawerTrigger>
                ) : null}
                <DrawerContent className="max-h-[95vh]">
                    <DrawerHeader>
                        <DrawerTitle>Create New Member</DrawerTitle>
                        <DrawerDescription>
                            Add a new member to your team
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
                            aria-label="Create"
                            onClick={form.handleSubmit(handleSubmit)}
                            isLoading={isCreatingMember}
                        >
                            {isCreatingMember ? "Creating..." : "Create Member"}
                        </AsyncButton>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 size-4" aria-hidden="true" />
                        Add Member
                    </Button>
                </DialogTrigger>
            ) : null}
            <DialogContent className="min-w-2xl max-w-4xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Member</DialogTitle>
                    <DialogDescription>
                        Add a new member to your team
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
                        aria-label="Create"
                        onClick={form.handleSubmit(handleSubmit)}
                        isLoading={isCreatingMember}
                    >
                        {isCreatingMember ? "Creating..." : "Create Member"}
                    </AsyncButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}