import { useEffect, useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { signClear } from '../../../features/sigIn/signSlice';
import { loginUser, userError } from '../../../features/user/userSlice';

// router
import { useNavigate } from 'react-router-dom';

// components and hooks
import { TextError } from '../signIn/TextError';
import { useUserAuth } from '../../../hooks/useUserAuth';

const Form = () => {
	const isInvalidUser = useSelector(userError);
	const { isUserLogged } = useUserAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const estado = useSelector((state) => state.sign);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isUserLogged) return;
		navigate('/productos');
		setEmail('');
		setPassword('');
	}, [isUserLogged]);

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(loginUser({ email, password }));
	};

	return (
		<div className='form d-flex justify-content-center my-0'>
			<form onSubmit={handleSubmit}>
				<div className='form-usuario d-flex flex-column my-4'>
					<label>EMAIL</label>
					<input
						type='text'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div className='form-contraseña d-flex flex-column my-4'>
					<label>CONTRASEÑA</label>
					<input
						type='password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					{isInvalidUser && (
						<TextError>Email o Contraseña incorrecto</TextError>
					)}
				</div>
				<div className='d-flex justify-content-center'>
					<button type='submit'>LOGIN</button>
				</div>
				<h5 className='text-center'>Olvidaste la contraseña</h5>
				<h5
					onClick={() => dispatch(signClear(!estado.estado))}
					className='text-center crear-cuenta'
				>
					Crea una cuenta
				</h5>
			</form>
		</div>
	);
};

export default Form;
