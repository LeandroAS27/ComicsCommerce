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
    const {register, formState: { errors }, control, handleSubmit, getValues} = useForm<PaymentForm>();
    
    type DiscountType = "DESCONTO10" | "FRETEGRATIS" | "BLACKFRIDAY";
    const mockCoupons: Record<DiscountType, number> = {
        "DESCONTO10": 10,
        "FRETEGRATIS": 0,
        "BLACKFRIDAY": 15,
    }
    
    const [discount, setDiscount] = useState<number>(0);
    const [couponError, setCouponError] = useState<string | null>(null);

    const isValidCoupon = (code: string): code is DiscountType => {
        return (Object.keys(mockCoupons) as string[]).includes(code);
    }

    const handleCouponValidation = () => {
        const couponCode = getValues("couponCode") || "";
        const formattedCouponCode = couponCode.toUpperCase();

        if(isValidCoupon(formattedCouponCode)){
            const discountValue = mockCoupons[formattedCouponCode];
            setDiscount(discountValue);
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
                component='form'
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
                                sx={{ width: '95%', maxWidth: '380px'}}
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
                {...register('cardHolder', {
                    required: "Insira um nome válido",
                })}
                sx={{ width: '95%', maxWidth: '380px'}}
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
                        sx={{flexGrow: 1}}
                    />
                    <Button
                        type='button'
                        variant='outlined'
                        onClick={handleCouponValidation}
                        sx={{ alignSelf: 'center'}}
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