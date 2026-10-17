import React from 'react';

import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';
import Modal, {
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/shared/components/Modal';

import type { GuideGroupView, GuideItemView } from './guides';

interface Props {
  title: string;
  groups: GuideGroupView[];
  /** `meta.guides_note`, shown as the footer */
  note?: string;
  /** The tile that opens the dialog */
  children: React.ReactElement;
}

function GuideList({ guides }: { guides: GuideItemView[] }) {
  return (
    <ul className="m-0 mb-4 p-0 list-none flex flex-col gap-1">
      {guides.map((guide) => (
        <li key={guide.key}>
          <a
            href={guide.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-start gap-2 rounded-xl px-3 py-2 no-underline',
              'text-gray-700 dark:text-gray-200',
              'hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <span className="flex-1 min-w-0">
              <span className="block font-medium text-theme-600 dark:text-theme-400">
                {guide.title}
              </span>
              {guide.description != null && (
                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  {guide.description}
                </span>
              )}
            </span>
            <Icon
              name="external-link"
              size={16}
              className="mt-1 shrink-0 text-gray-400"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Heading(props: {
  as: 'h2' | 'h3';
  icon: string | null;
  children: React.ReactNode;
}) {
  const { as: Tag, icon, children } = props;
  return (
    <Tag
      className={cn(
        'flex items-center gap-2 m-0 pb-2 font-bold',
        'text-gray-700 dark:text-gray-200',
        Tag === 'h2' ? 'text-xl' : 'text-base text-gray-600 dark:text-gray-300'
      )}
    >
      {icon != null && <Icon name={icon} size={Tag === 'h2' ? 22 : 18} />}
      {children}
    </Tag>
  );
}

const GuidesDialog: React.FC<Props> = function (props) {
  const { title, groups, note, children } = props;

  return (
    <Modal>
      <ModalTrigger asChild={true}>{children}</ModalTrigger>

      <ModalContent aria-describedby={undefined}>
        <div className="px-6 py-4">
          <ModalTitle>{title}</ModalTitle>

          {groups.map((group) => (
            <section key={group.key} className="pt-2">
              <Heading as="h2" icon={group.icon}>
                {group.title}
              </Heading>
              {group.guides.length > 0 && <GuideList guides={group.guides} />}
              {group.categories.map((category) => (
                <div key={category.key} className="pl-1">
                  <Heading as="h3" icon={category.icon}>
                    {category.title}
                  </Heading>
                  <GuideList guides={category.guides} />
                </div>
              ))}
            </section>
          ))}

          {note != null && note.trim() !== '' && (
            <p
              className={cn(
                'mt-2 pt-4 border-t border-gray-200 dark:border-gray-700',
                'text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line'
              )}
            >
              {note}
            </p>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default GuidesDialog;
