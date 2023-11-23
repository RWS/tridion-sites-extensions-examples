import { memo } from 'react';
import styled from 'styled-components';

import { t } from '@globals';
import { Center } from '@tridion-sites/extensions';

import { usePublishTransactions } from './usePublishTransactions';

const Table = styled.table`
    thead {
        text-align: left;
    }
`;

export const PublishTransactionsPage = memo(() => {
    const { transactions, isLoading } = usePublishTransactions();

    if (isLoading) {
        return (
            <Center shouldFill>
                <progress />
            </Center>
        );
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>{t('tableColumnHeaders.name')}</th>
                    <th>{t('tableColumnHeaders.target')}</th>
                    <th>{t('tableColumnHeaders.publication')}</th>
                    <th>{t('tableColumnHeaders.action')}</th>
                    <th>{t('tableColumnHeaders.state')}</th>
                    <th>{t('tableColumnHeaders.time')}</th>
                </tr>
            </thead>
            <tbody>
                {transactions?.map(transaction => (
                    <tr key={transaction.Id}>
                        <td>{transaction.Title}</td>
                        <td>{transaction.TargetType?.Title}</td>
                        <td>{transaction.PublishContexts ? transaction.PublishContexts[0].Publication?.Title : ''}</td>
                        <td>{transaction.Instruction?.$type}</td>
                        <td>{transaction.State}</td>
                        <td>
                            {transaction.StateChangeDateTime
                                ? new Date(transaction.StateChangeDateTime).toLocaleString()
                                : ''}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
});

PublishTransactionsPage.displayName = 'PublishTransactions';
