import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import '../styles/PaymentForm.scss';
import InputMask from 'react-input-mask';

//material ui
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';

interface PaymentForm{
    cardHolder: string,
    cardNumber: string,
    expireDate: string,
    cvv: string,
    couponCode?: string;
}

const PaymentForm = ({ onSubmit }: { onSubmit: (data: PaymentForm, discount: number) => void}) => {
    const {register, formState: { errors }, control, handleSubmit, setValue, getValues} = useForm<PaymentForm>();

    const mockCoupons = {
        "DESCONTO10": 10,
        "FRETEGRATIS": 0,
        "BLACKFRIDAY": 15,
    }
    
    const [discount, setDiscount] = useState<number>(0);
    const [couponError, setCouponError] = useState<string | null>(null);

    const handleCouponValidation = () => {
        const couponCode = getValues("couponCode") || "";
        if(mockCoupons[couponCode.toUpperCase()]){
            const discountValue = mockCoupons[couponCode.toUpperCase()];
            setDiscount(discountValue)
            setCouponError(null);
            alert(`Cupom aplicado! Voce ganhou ${discountValue}% de desconto.`);
        }else{
            setDiscount(0);
            setCouponError("Cupom invalido. Tente novamente.");
        }
    };

    return(
        <form 
        onSubmit={handleSubmit((data) => onSubmit(data, discount))} 
        className='checkout-form'>
            <h1 className="checkout-form_title">Cartao de Crédito</h1>
            <Box
                sx={{ '& > :not(style)': { m: 1, width: '500', maxWidth: '100%' } }}
                noValidate
                autoComplete="off"
            >
                {/* Número do Cartão */}
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
                {/* Nome do Titular */}
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
                    {/* CVV */}
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
                {/* Cupom de Desconto */}
                <div className='checkout-form_coupon'>
                    <TextField
                        id='couponCode'
                        label='Código de Desconto'
                        variant='outlined'
                        placeholder='Insira seu cupom'
                        {...register('couponCode')}
                    />
                    <Button
                        type='button'
                        variant='outlined'
                        onClick={handleCouponValidation}
                    >
                        Aplicar Cupom
                    </Button>
                </div>
                {couponError && <p className='coupon-error'>{couponError}</p>}
                {discount > 0 && <p className='coupon-success'>Cupom aplicado: {discount}%</p>}
            </Box>
            <button type='submit' className='checkout-form_submit-button'>Confirmar Pagamento</button>
        </form>
    )
}

export default PaymentForm;