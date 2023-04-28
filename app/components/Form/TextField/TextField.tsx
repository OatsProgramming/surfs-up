import styles from './textField.module.css'

export default function TextField({ id, onChange, value, label, type } : TextFieldProp) {

    return (
        <div className={styles['container']}>
            <input 
                id={id}
                type={type}
                value={value[id]}
                onChange={(e) => onChange({ 
                    [id] : e.target.value
                })}
                placeholder=" "
            />
            <label 
                htmlFor={id}
                className='easeTransition'
            >
                {label}
            </label>
        </div>
    )
}