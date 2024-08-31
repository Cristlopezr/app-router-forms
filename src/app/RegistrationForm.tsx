'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schema } from './registrationSchema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
    onDataAction: (data: z.infer<typeof schema>) => Promise<{
        message: string;
        user?: z.infer<typeof schema>;
        issues?: string[];
    }>;
    onFormAction: (formData: FormData) => Promise<{
        message: string;
        user?: z.infer<typeof schema>;
        issues?: string[];
    }>;
}

export const RegistrationForm = ({ onDataAction, onFormAction }: Props) => {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            first: '',
            last: '',
            email: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        //JSON Format
        /*   fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => console.log(data)); */

        //FormData Format
        /* const formData = new FormData();
        formData.append('first', data.first);
        formData.append('last', data.last);
        formData.append('email', data.email);
        fetch('/api/registerForm', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => console.log(data)); */

        //Server Action
        //console.log(await onDataAction(data));

        //Server Action FormData
        const formData = new FormData();
        formData.append('first', data.first);
        formData.append('last', data.last);
        formData.append('email', data.email);

        console.log(await onFormAction(formData));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <div className='flex items-center gap-2'>
                    <FormField
                        control={form.control}
                        name='first'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='' {...field} />
                                </FormControl>
                                <FormDescription>Your first name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='last'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='' {...field} />
                                </FormControl>
                                <FormDescription>Your last name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='' {...field} />
                            </FormControl>
                            <FormDescription>Your email address.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};
