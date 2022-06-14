import { FC, useMemo } from "react";
import { Field, Formik, Form, FieldArray } from "formik";
import { object, string, number, mixed, array, ref } from "yup";

import { Button, Grid } from "@mui/material";

import {
  IDropdownOption,
  IIntermediary,
  IntermediaryType,
} from "@src/types/Intermediary";
import { InputText, InputSelect } from "@src/common/uiComponents/Forms";

import { IIntermediaryFormBaseProps } from "./types";
import { intermediaryFormFields } from "./constants";

const {
  nameField,
  orderField,
  typeField,
  rangeOptionsField,
  rangeOptionsFromField,
  rangeOptionsToField,
  rangeOptionsStepField,
  dropdownOptionsField,
  dropdownOptionNameField,
  dropdownOptionValueField,
} = intermediaryFormFields;

const isReachableValues = (prevFrom: number, newFrom: number, step: number) => {
  const fromDifference = prevFrom - newFrom;
  const quotient = Math.floor(fromDifference / step);

  return prevFrom === newFrom + quotient * step;
};

const IntermediaryFormBase: FC<IIntermediaryFormBaseProps> = ({
  intermediary,
  onSubmit,
}) => {
  const isEditing = !!intermediary;

  const intermediaryFormBaseInitialValues = useMemo(
    () => ({
      [nameField]: intermediary?.name ?? "",
      [orderField]: intermediary?.order ?? 1,
      [typeField]: intermediary?.type ?? "",
      [rangeOptionsField]: intermediary?.rangeOptions ?? {
        [rangeOptionsFromField]: "",
        [rangeOptionsToField]: "",
        [rangeOptionsStepField]: "",
      },
      [dropdownOptionsField]: intermediary?.dropdownOptions ?? [
        {
          [dropdownOptionNameField]: "",
          [dropdownOptionValueField]: "",
        },
      ],
    }),
    [intermediary]
  );

  const intermediaryFormBaseValidationSchema = useMemo(
    () =>
      object({
        [nameField]: string().max(255).required(),
        [orderField]: number().required(),
        [typeField]: mixed<IntermediaryType>()
          .oneOf([IntermediaryType.Dropdown, IntermediaryType.Range])
          .required(),
        [rangeOptionsField]: object().when(typeField, {
          is: IntermediaryType.Range,
          then: object()
            .shape({
              [rangeOptionsFromField]: number()
                .required()
                .when(rangeOptionsStepField, {
                  is: (stepValue: number) => stepValue > 0 && isEditing,
                  then: number().test(
                    "from-can-be-changed",
                    "New value cannot be set",
                    (value, context) => {
                      const previousFrom =
                        intermediary?.rangeOptions?.from ?? 0;

                      if (!value) {
                        return false;
                      }

                      return isReachableValues(
                        previousFrom,
                        value,
                        context.parent[rangeOptionsStepField]
                      );
                    }
                  ),
                }),
              [rangeOptionsToField]: number()
                .moreThan(
                  ref(rangeOptionsFromField),
                  "Should be more than From"
                )
                .required(),
              [rangeOptionsStepField]: number()
                .positive()
                .required()
                .test(
                  "step-can-be-changed",
                  "New value cannot set",
                  (value, context) => {
                    const prevStep = intermediary?.rangeOptions?.step ?? 0;
                    const prevFrom = intermediary?.rangeOptions?.from ?? 0;
                    if (!value) {
                      return false;
                    }

                    const isLessThanPrevious = value < prevStep;
                    const isReachable = isReachableValues(
                      prevFrom,
                      context.parent[rangeOptionsFromField],
                      value
                    );

                    if (isEditing && isLessThanPrevious) {
                      if (isReachable) {
                        return true;
                      }

                      return false;
                    }

                    return isReachable;
                  }
                ),
            })
            .required(),
          otherwise: object().nullable(),
        }),
        [dropdownOptionsField]: array().when(typeField, {
          is: IntermediaryType.Dropdown,
          then: array<IDropdownOption>()
            .of(
              object().shape({
                [dropdownOptionNameField]: string().required(),
                [dropdownOptionValueField]: number().required(),
              })
            )
            .min(1)
            .required(),
        }),
      }),
    [isEditing, intermediary]
  );

  // TODO: Add type to initial values
  const handleSubmit = (values) => {
    const intermediary: IIntermediary = {
      ...values,
    };

    onSubmit(intermediary);
  };

  return (
    <Formik
      initialValues={intermediaryFormBaseInitialValues}
      validationSchema={intermediaryFormBaseValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, isSubmitting }) => (
        <Grid component={Form} container spacing={2}>
          <Grid item xs={12}>
            <Field name={nameField} label="Name" component={InputText} />
          </Grid>
          <Grid item xs={12}>
            <Field
              name={orderField}
              label="Order"
              type="number"
              component={InputText}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name={typeField}
              label="Type"
              component={InputSelect}
              disabled={!!intermediary}
              // TODO: create options gracefully
              options={[
                {
                  label: "Dropdown",
                  value: IntermediaryType.Dropdown,
                },
                {
                  label: "Range",
                  value: IntermediaryType.Range,
                },
              ]}
            />
          </Grid>
          {values[typeField] === IntermediaryType.Range && (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Field
                    name={`${rangeOptionsField}.${rangeOptionsFromField}`}
                    label="Range from"
                    type="number"
                    component={InputText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name={`${rangeOptionsField}.${rangeOptionsToField}`}
                    label="Range to"
                    type="number"
                    component={InputText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name={`${rangeOptionsField}.${rangeOptionsStepField}`}
                    label="Range step"
                    type="number"
                    component={InputText}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {values[typeField] === IntermediaryType.Dropdown && (
            <Grid item xs={12}>
              {/* TODO: Could be moved to a separate component */}
              <FieldArray name={dropdownOptionsField}>
                {({ remove, push }) => (
                  <div>
                    {/* TODO: Following type error will be fixed if initial values will be typed */}
                    {(values[dropdownOptionsField] as IDropdownOption[]).map(
                      (_, idx) => (
                        <div key={idx}>
                          <Field
                            name={`${dropdownOptionsField}.${idx}.${dropdownOptionNameField}`}
                            label="Option name"
                            component={InputText}
                          />
                          <Field
                            name={`${dropdownOptionsField}.${idx}.${dropdownOptionValueField}`}
                            label="Option value"
                            type="number"
                            component={InputText}
                          />
                          <Button color="error" onClick={() => remove(idx)}>
                            Remove
                          </Button>
                        </div>
                      )
                    )}

                    <Button
                      onClick={() =>
                        push({
                          [dropdownOptionNameField]: "",
                          [dropdownOptionValueField]: 0,
                        })
                      }
                    >
                      Add option
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Save
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default IntermediaryFormBase;
