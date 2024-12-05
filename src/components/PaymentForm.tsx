import { useForm, Controller } from 'react-hook-form';
import '../styles/PaymentForm.scss';
import InputMask from 'react-input-mask';

//material ui
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

interface PaymentForm{
    cardHolder: string,
    cardNumber: string,
    expireDate: string,
    cvv: string
}

const PaymentForm = ({ onSubmit }: { onSubmit: (data: PaymentForm) => void}) => {
    const {register, formState: { errors }, control, handleSubmit} = useForm<PaymentForm>();
    return(
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='checkout-form'>
            <h1 className="checkout-form_title">Cartao de Crédito</h1>
            <Box
                sx={{ '& > :not(style)': { m: 1, width: '500', maxWidth: '100%' } }}
                noValidate
                autoComplete="off"
            >
                <Controller
                    name="cardNumber"
                    control={control}
                    defaultValue=''
                    rules={{
                        required: "Insira um número de cartão válido",
                        pattern: {
                            value: /^[0-9\s]{19}$/,
                            message: "Número de cartão inválido",
                        },
                    }}
                    render={({ field }) => (
                        <InputMask
                            mask="9999 9999 9999 9999"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            >
                            {() => (
                                <TextField 
                                {...field}
                                label="Número do cartão" 
                                variant="outlined" 
                                placeholder="0000 0000 0000 0000"
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber ? errors.cardNumber.message : ''}
                                fullWidth
                                />
                            )}
                        </InputMask>
                    )}
                />
                <TextField 
                id="cardHolder" 
                label="Nome do Titular" 
                variant="outlined" 
                placeholder="Nome impresso no cartão"
                error={!!errors.cardHolder}
                helperText={errors.cardHolder ? errors.cardHolder.message : ''}
                fullWidth
                {...register('cardHolder', {
                    required: "Insira um nome válido",
                })}
                />
                <div className="checkout-form_expiry-cvv">
                    <Controller
                        name="expireDate"
                        control={control}
                        defaultValue=''
                        rules={{
                            required: "Insira uma data válida",
                            pattern: {
                                value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                                message: "Data de validade inválida",
                            }
                        }}
                        render={({ field }) => (
                        <InputMask
                            mask="99/99"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            >
                                {() => (
                                    <TextField 
                                    {...field}
                                    label="Validade" 
                                    variant="outlined" 
                                    placeholder='MM/AA'
                                    error={!!errors.expireDate}
                                    helperText={errors.expireDate ? errors.expireDate.message : ''}     
                                    />
                                )}
                            </InputMask>
                        )}
                    />

                    <TextField 
                    id="cvv" 
                    label="CVV" 
                    variant="outlined" 
                    placeholder="123"
                    error={!!errors.cvv}
                    helperText={errors.cvv ? errors.cvv.message : ''}
                    {...register('cvv', {
                        required: "Insira um cvv válido",
                        pattern: {
                            value: /^[0-9]{3,4}$/,
                            message: "CVV inválido",
                        }
                    })}
                    />
                </div>
            </Box>
            <button type='submit' className='checkout-form_submit-button'>Confirmar Pagamento</button>
        </form>
    )
}

export default PaymentForm;