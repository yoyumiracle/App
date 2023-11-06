import React from 'react';
import {View, ScrollView} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import lodashGet from 'lodash/get';
import useLocalize from '../../../../hooks/useLocalize';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';
import ONYXKEYS from '../../../../ONYXKEYS';
import CONST from '../../../../CONST';
import subStepPropTypes from '../../subStepPropTypes';
import {reimbursementAccountPropTypes} from '../../reimbursementAccountPropTypes';
import TextLink from '../../../../components/TextLink';
import MenuItemWithTopDescription from '../../../../components/MenuItemWithTopDescription';
import Button from '../../../../components/Button';
import ScreenWrapper from '../../../../components/ScreenWrapper';
import * as ErrorUtils from '../../../../libs/ErrorUtils';
import DotIndicatorMessage from '../../../../components/DotIndicatorMessage';
import reimbursementAccountDraftPropTypes from '../../ReimbursementAccountDraftPropTypes';
import * as ReimbursementAccountProps from '../../reimbursementAccountPropTypes';

const propTypes = {
    /** Reimbursement account from ONYX */
    reimbursementAccount: reimbursementAccountPropTypes,

    /** The draft values of the bank account being setup */
    reimbursementAccountDraft: reimbursementAccountDraftPropTypes,

    ...subStepPropTypes,
};

const defaultProps = {
    reimbursementAccount: ReimbursementAccountProps.reimbursementAccountDefaultProps,
    reimbursementAccountDraft: {},
};

function Confirmation({reimbursementAccount, reimbursementAccountDraft, onNext, onMove}) {
    const {translate} = useLocalize();

    const values = {
        firstName: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.FIRST_NAME, ''),
        lastName: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.LAST_NAME, ''),
        dob: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.DOB, ''),
        ssnLast4: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.SSN_LAST_4, ''),
        street: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.STREET, ''),
        city: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.CITY, ''),
        state: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.STATE, ''),
        zipCode: lodashGet(reimbursementAccountDraft, CONST.BANK_ACCOUNT.PERSONAL_INFO_STEP.INPUT_KEY.ZIP_CODE, ''),
    };

    const error = ErrorUtils.getLatestErrorMessage(reimbursementAccount);

    return (
        <ScreenWrapper
            testID={Confirmation.displayName}
            style={[styles.pt0]}
            scrollEnabled
        >
            <ScrollView contentContainerStyle={styles.flexGrow1}>
                <Text style={[styles.textHeadline, styles.ph5, styles.mb8]}>{translate('personalInfoStep.letsDoubleCheck')}</Text>
                <MenuItemWithTopDescription
                    description={translate('personalInfoStep.legalName')}
                    title={`${values.firstName} ${values.lastName}`}
                    shouldShowRightIcon
                    onPress={() => {
                        onMove(0);
                    }}
                />
                <MenuItemWithTopDescription
                    description={translate('common.dob')}
                    title={values.dob}
                    shouldShowRightIcon
                    onPress={() => {
                        onMove(1);
                    }}
                />
                <MenuItemWithTopDescription
                    description={translate('personalInfoStep.last4SSN')}
                    title={values.ssnLast4}
                    shouldShowRightIcon
                    onPress={() => {
                        onMove(2);
                    }}
                />
                <MenuItemWithTopDescription
                    description={translate('personalInfoStep.address')}
                    title={`${values.street}, ${values.city}, ${values.state} ${values.zipCode}`}
                    shouldShowRightIcon
                    onPress={() => {
                        onMove(3);
                    }}
                />

                <Text style={[styles.mt3, styles.ph5, styles.textMicroSupporting]}>
                    {`${translate('personalInfoStep.byAddingThisBankAccount')} `}
                    <TextLink
                        href={CONST.ONFIDO_FACIAL_SCAN_POLICY_URL}
                        style={[styles.textMicro]}
                    >
                        {translate('onfidoStep.facialScan')}
                    </TextLink>
                    {', '}
                    <TextLink
                        href={CONST.ONFIDO_PRIVACY_POLICY_URL}
                        style={[styles.textMicro]}
                    >
                        {translate('common.privacy')}
                    </TextLink>
                    {` ${translate('common.and')} `}
                    <TextLink
                        href={CONST.ONFIDO_TERMS_OF_SERVICE_URL}
                        style={[styles.textMicro]}
                    >
                        {translate('common.termsOfService')}
                    </TextLink>
                </Text>
                <View style={[styles.ph5, styles.mtAuto]}>
                    {error.length > 0 && (
                        <DotIndicatorMessage
                            textStyles={[styles.formError]}
                            type="error"
                            messages={{0: error}}
                        />
                    )}
                    <Button
                        success
                        style={[styles.w100, styles.mt2, styles.pb5]}
                        onPress={onNext}
                        text={translate('common.confirm')}
                    />
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}

Confirmation.propTypes = propTypes;
Confirmation.defaultProps = defaultProps;
Confirmation.displayName = 'Confirmation';

export default withOnyx({
    reimbursementAccount: {
        key: ONYXKEYS.REIMBURSEMENT_ACCOUNT,
    },
    reimbursementAccountDraft: {
        key: ONYXKEYS.REIMBURSEMENT_ACCOUNT_DRAFT,
    },
})(Confirmation);
