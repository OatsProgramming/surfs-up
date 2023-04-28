type Brand<K, T> = K & { __brand: T }

type Email = Brand<string, 'email'>

type UserProp = 'email' | 'username' | 'password'

type User = Record<UserProp, | string> & {
    email: Email
}

type UserPartial = Partial<User>

type TextFieldProp = {
    onChange: (args: UserPartial) => void,
    value: User,
    label: string,
    id: UserProp,
    type: 'text' | 'password',
}