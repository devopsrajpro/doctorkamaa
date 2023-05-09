import { useCallback } from "react";

const paypalTranSuccess = useCallback(() => {
    console.log('state', paypaylState);
    console.log('time', time);
    console.log('timevalidation', timeValidation);
    console.log('deliverymethod', sliderDeliveryValue);
    console.log('tos', acceptBox);
    if (sliderDeliveryValue == '') {
        toast.error(`Pls choose deliverymethod`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        setError(true);
        return false;
    }
    if (sliderDeliveryValue === 'lieferung') {
        console.log('test1');
        if (carttotal <= settings[0]?.minDeliveryAmount) {
            toast.error(
                `Miniumorder amount not reached ${settings[0]?.minDeliveryAmount}€`,
                {
                    position: toast.POSITION.BOTTOM_RIGHT,
                }
            );
            setError(true);
            return false;
        }
        if (!timeValidation) {
            toast.error(`We are closed.`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(true);
            return false;
        }
        if (!acceptBox) {
            toast.error(`Pls accept ToS`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(true);
            return false;
        }
        setError(false);
    } else if (sliderDeliveryValue === 'abholung') {
        console.log('test2');
        if (carttotal <= 2) {
            toast.error(`Min order Amount`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(true);
            return false;
        }
        if (!timeValidation) {
            toast.error('We are closed.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(true);
            return false;
        }
        if (!acceptBox) {
            toast.error(`Accept ToS`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(true);
            return false;
        }
        setError(false);
    } else {
        setError(true);
        toast.error(`Pls choose deliverymethod`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }



}, [paypaylState])