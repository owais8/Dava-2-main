'use client';

import { Fragment, useState } from 'react';

import { Grid2 } from '@mui/material';
import dayjs from 'dayjs';

import { AccountOwner } from './AccountOwner';
import { BillingInfo } from './BillingInfo';
import { EditBillingModal } from './EditBillingModal';
import type { IPaymentCardProps } from './PaymentCard';
import { PaymentMethod } from './PaymentMethod';
import { UpsertCardModal } from './UpsertCardModal';
import { Card, Modal, PageHeading } from '@/components';
import constants from '@/constants';
import utils from '@/utils';

export function BillingDetail() {
  const [iseLoading, setIsLoading] = useState(false);
  const [openEditBillingModal, setOpenEditBillingModal] = useState(false);
  const [openUpsertCardModal, setOpenUpsertCardModal] = useState(false);
  const [dataEdit, setDataEdit] = useState<IPaymentCardProps>();
  const [actionModal, setActionModal] = useState<TActionClick | undefined>();

  const BILLING_INFO = {
    billingName: 'John Smith',
    billingAddress: '123 Business Ave New York, NY 10001 United States',
  };

  const handleAction = (id: number | string, type: TAction) => {
    if (type === 'edit') {
      const data = CARD_DATA.find((e) => e.id === id);
      if (!data) return;

      setDataEdit({
        ...data,
        expiryDate: dayjs(data?.expiryDate, constants.shared.DATETIME.MMYY),
      });

      setOpenUpsertCardModal(true);

      return;
    }

    setActionModal({ id, actionType: type });
  };

  const CARD_DATA: IPaymentCardProps[] = [
    {
      id: 1,
      brand: 'Visa',
      lastFour: '4242',
      expiryDate: '12/24',
      isDefault: true,
      cardName: 'John Smith',
      cardNumber: '4242424242424242',
      cvv: '123',
      onAction: handleAction,
    },
    {
      id: 2,
      brand: 'Mastercard',
      lastFour: '8888',
      expiryDate: '09/24',
      isDefault: false,
      cardName: 'John Smith',
      cardNumber: '4242424242424242',
      cvv: '123',
      onAction: handleAction,
    },
  ];

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      utils.showToast(
        'success',
        actionModal?.actionType === 'remove' ? 'Card removed' : 'Card set as default',
      );
      setActionModal(undefined);
    }, 2000);
  };

  const handleCloseActionModal = () => {
    setActionModal(undefined);
  };

  return (
    <Fragment>
      <Card>
        <PageHeading
          title="Billing Details"
          description="Manage your payment options and view transaction history"
        />
        <Grid2 container columnSpacing={4} rowSpacing={{ xs: 4, md: 0 }} mb={6}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <PaymentMethod data={CARD_DATA} handleAdd={() => setOpenUpsertCardModal(true)} />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <BillingInfo {...BILLING_INFO} onEdit={() => setOpenEditBillingModal(true)} />
          </Grid2>
        </Grid2>

        <AccountOwner />
      </Card>

      {openEditBillingModal && (
        <EditBillingModal
          data={BILLING_INFO}
          open={openEditBillingModal}
          onCancel={() => setOpenEditBillingModal(false)}
        />
      )}

      {openUpsertCardModal && (
        <UpsertCardModal
          data={dataEdit}
          open={openUpsertCardModal}
          onCancel={() => {
            setOpenUpsertCardModal(false);
            setDataEdit(undefined);
          }}
        />
      )}

      {(actionModal?.actionType === 'remove' || actionModal?.actionType === 'setAsDefault') && (
        <Modal
          title={
            actionModal?.actionType === 'remove' ? 'Confirm Remove Card' : 'Confirm Set as default'
          }
          subTitle={
            actionModal?.actionType === 'remove'
              ? 'This cannot be undone.'
              : 'Make this card your default payment method.'
          }
          okText={actionModal?.actionType === 'remove' ? 'Remove' : 'Confirm'}
          onSubmit={handleSubmit}
          open={actionModal?.actionType === 'remove' || actionModal?.actionType === 'setAsDefault'}
          onCancel={handleCloseActionModal}
          isLoading={iseLoading}
        />
      )}
    </Fragment>
  );
}
