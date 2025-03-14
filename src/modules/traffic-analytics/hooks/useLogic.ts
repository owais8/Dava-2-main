/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty } from 'lodash';
import type { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { dayjs } from '@/lib';
import { AnnotationMockData } from '@/modules/traffic-analytics/data';
import {
  OverviewFilterReqSchema,
  type TAnnotation,
  type TOverviewFilter,
} from '@/modules/traffic-analytics/schemas';

export const useLogic = () => {
  const [errorFields, setErrorFields] = useState<TAnnotation[] | null>(null);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [annotationData, setAnnotationData] = useState<TAnnotation[]>(AnnotationMockData);

  const methods = useForm<TOverviewFilter>({
    resolver: zodResolver(OverviewFilterReqSchema),
    defaultValues: {
      source: 'all',
      dateRange: '30',
    },
  });

  useEffect(() => {
    if (!expanded) return;

    const updatedData = annotationData.map((item) => ({
      ...item,
      isEdit: false,
    }));

    setAnnotationData(updatedData);
  }, [expanded]);

  const handleExpand = (panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleInputChange = (e: any, id?: string) => {
    const updatedData = annotationData.map((item) => {
      if (!id && item.id === e.target.id) {
        return { ...item, [e.target.name]: e.target.value };
      }

      if (id && item.id === id) {
        const newDate = dayjs(e).format('D MMM, YYYY').toUpperCase();

        return { ...item, date: newDate };
      }

      return item;
    });
    setAnnotationData(updatedData);
  };

  const checkError = () => {
    const fieldError = annotationData.filter((item) => item.date === '' || item.text === '');

    if (!isEmpty(fieldError)) {
      setErrorFields(fieldError);

      return false;
    }

    return true;
  };

  const handleToggleHighlight = (id: string) => {
    const updatedData = annotationData.map((item) => {
      if (item.id === id) {
        return { ...item, isActived: !item.isActived };
      }

      return item;
    });
    setAnnotationData(updatedData);
  };

  const handleCreate = () => {
    if (!checkError()) return;

    const newAnnotation = {
      id: uuidv4(),
      date: '',
      text: '',
      isActived: false,
      isEdit: false,
      isCreate: true,
    };
    setAnnotationData([...annotationData, newAnnotation]);
  };

  const handleEdit = (id: string) => {
    if (!checkError()) return;

    const updatedData = annotationData.map((item) => {
      if (item.id === id) {
        return { ...item, isEdit: !item.isEdit };
      }

      return item;
    });

    setAnnotationData(updatedData);
  };

  const handleDelete = (id: string) => {
    const updatedData = annotationData.filter((item) => item.id !== id);
    setAnnotationData(updatedData);
  };

  const handleSave = (id: string) => {
    if (!checkError()) return;

    const updatedData = annotationData.map((item) => {
      if (item.id === id) {
        return { ...item, isCreate: false, isEdit: false };
      }

      return item;
    });
    setAnnotationData(updatedData);
  };

  return {
    methods,
    errorFields,
    expanded,
    annotationData,
    handleInputChange,
    handleExpand,
    handleToggleHighlight,
    handleEdit,
    handleSave,
    handleCreate,
    handleDelete,
  };
};
