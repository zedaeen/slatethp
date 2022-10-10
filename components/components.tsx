import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { cx, css } from '@emotion/css'

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export function Button() {
    return React.forwardRef(
        (
          {
            className,
            active,
            reversed,
            ...props
          }: PropsWithChildren<
            {
              active: boolean
              reversed: boolean
            } & BaseProps
          >,
          ref: Ref<OrNull<HTMLSpanElement>>
        ) => (
          <span
            {...props}
            ref={ref}
            className={cx(
              className,
              css`
                cursor: pointer;
                color: ${reversed
                  ? active
                    ? 'white'
                    : '#aaa'
                  : active
                  ? '#8e7cc3'
                  : '#ccc'};
              `
            )}
          />
        )
      )
} 

export function Menu() {
    return React.forwardRef(
        (
          { className, ...props }: PropsWithChildren<BaseProps>,
          ref: Ref<OrNull<HTMLDivElement>>
        ) => (
          <div
            {...props}
            ref={ref}
            className={cx(
              className,
              css`
                & > * {
                  display: inline-block;
                }
                & > * + * {
                  margin-left: 15px;
                }
              `
            )}
          />
        )
      )
} 

export function Toolbar() {
    const MenuComponent = Menu()
    return React.forwardRef(
        (
          { className, ...props }: PropsWithChildren<BaseProps>,
          ref: Ref<OrNull<HTMLDivElement>>
        ) => (
          <MenuComponent
            {...props}
            ref={ref}
            className={cx(
              className,
              css`
                position: relative;
                padding: 1px 18px 17px;
                margin: 0 -20px;
                border-bottom: 2px solid #eee;
                margin-bottom: 20px;
              `
            )}
          />
        )
      )
}