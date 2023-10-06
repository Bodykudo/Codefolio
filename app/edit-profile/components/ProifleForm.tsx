'use client';

import { SessionInterface, UserProfile } from '@/types';
import { FormEvent, useState } from 'react';
import FormField from '../../../components/FormField';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { editUser, fetchToken } from '@/lib/actions';
import Button from '../../../components/Button';

type Props = {
  session: SessionInterface;
  user: UserProfile;
};

export default function ProifleForm({ session, user }: Props) {
  const [form, setForm] = useState({
    name: user.name || '',
    // title: user.role,
    email: user.email,
    description: user.description || '',
    jobTitle: user.jobTitle || '',
    linkedInURL:
      user.linkedInURL?.replace('https://www.linkedin.com/in/', '') || '',
    githubURL: user.githubURL?.replace('https://github.com/', '') || '',
    behanceURL: user.behanceURL?.replace('https://www.behance.net/', '') || '',
    // featuredProject:
    //   user.projects?.edges?.length > 0 ? user.projects.edges[0].node.title : '',
    // featuredProjectImage:
    //   user?.projects.edges?.length > 0 ? user.projects.edges[0].node.image : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { token } = await fetchToken();

    const loading = toast.loading('Editing your profile');
    try {
      await editUser(form, user.id || '', token);
      toast.remove(loading);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.remove(loading);
      toast.error('Profile failed to update 😟');
    } finally {
      setIsSubmitting(false);
      router.back();
    }
  };

  const handlePatternChange = (
    fieldName: string,
    value: string,
    pattern: RegExp
  ) => {
    if (pattern.test(value)) {
      handleStateChange(fieldName, value);
    }
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mx-auto flex w-full max-w-5xl flex-col items-center justify-start gap-10 pt-12 text-lg"
    >
      <FormField
        title="Name"
        state={form.name}
        placeholder="Your Name"
        isRequired
        setState={(value: string) => handleStateChange('name', value)}
      />

      <FormField
        title="Email"
        state={form.email}
        placeholder="Email"
        isRequired
        isDisabled
        setState={(value: string) => handleStateChange('name', value)}
      />

      <FormField
        title="Job Title"
        state={form.jobTitle}
        placeholder="Software Engineer"
        setState={(value: string) => handleStateChange('jobTitle', value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Talk about yourself"
        isTextArea
        setState={(value: string) => handleStateChange('description', value)}
      />

      <FormField
        title="Linkedin URL"
        state={form.linkedInURL}
        placeholder="Username"
        prefixValue="https://www.linkedin.com/in/"
        isURL
        setState={(value: string) =>
          handlePatternChange('linkedInURL', value, /^$|^[a-zA-Z0-9_-]+$/)
        }
      />

      <FormField
        title="Github URL"
        state={form.githubURL}
        placeholder="Username"
        prefixValue="https://github.com/"
        isURL
        setState={(value: string) =>
          handlePatternChange('githubURL', value, /^$|^[a-zA-Z0-9-]+$/)
        }
      />

      <FormField
        title="Behance URL"
        state={form.behanceURL}
        placeholder="Username"
        isURL
        prefixValue="https://www.behance.net/"
        setState={(value: string) =>
          handlePatternChange('behanceURL', value, /^$|^[a-zA-Z0-9_-]+$/)
        }
      />

      {/* <SelectField
        title="Featured Project"
        state={form.featuredProject}
        filters={}
        setState={(value: string) =>
          handleStateChange('featuredProject', value)
        }
      /> */}

      <div className="flex w-full items-center justify-start">
        <Button
          title={isSubmitting ? 'Updating...' : 'Update'}
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isDisabled={isSubmitting}
        />
      </div>
    </form>
  );
}
