"use client";

import {
  SelectHTMLAttributes,
  forwardRef,
  ReactNode,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from "react";
import type { Option } from "@/types/global";

import IconDown from "@/assets/icons/arrow_down.svg";
import IconSearch from "@/assets/icons/search.svg";
import IconCheck from "@/assets/icons/check.svg";
import IconSetting from "@/assets/icons/settings_black.svg";
import { Divider } from "antd";

interface SelectProps extends SelectHTMLAttributes<HTMLDivElement> {
  form?: any;
  options: Option[];
  className?: string;
  placeholder?: string | JSX.Element;
  error?: boolean;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage?: string;
  searchable?: boolean;
  startIcon?: ReactNode;
  onChangeValue?: (item: Option) => void;
  menuStatus?: boolean;
  kind?: string;
  disabled?: boolean;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      form,
      options,
      className,
      placeholder,
      error,
      setError,
      errorMessage,
      searchable,
      startIcon,
      onChangeValue,
      menuStatus,
      kind,
      disabled,
      ...props
    },
    ref
  ) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [selectOpen, setSelectOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [selectIcon, setSelectIcon] = useState<ReactNode | undefined>(
      undefined
    );
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

    useEffect(() => {
      setSelectedValue(props?.value as string);
      setFilteredOptions(options);
    }, [props.value, options]);

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          selectOpen
        ) {
          setSelectOpen(false);
          setFilteredOptions(options);
        }
      };

      document?.addEventListener("click", handleOutsideClick);

      return () => {
        document?.removeEventListener("click", handleOutsideClick);
      };
    }, [options, selectedValue, selectOpen]);

    const handleSearchOptions = (e: ChangeEvent<HTMLInputElement>) => {
      let newFilteredOptions: Option[] = [];
      if (kind === 'phone') {
        newFilteredOptions = options.filter((item: Option) =>
          item?.country?.toLowerCase().includes(e.target.value.toLowerCase())
        );
      } else {
        newFilteredOptions = options.filter((item: Option) =>{
          if(typeof item?.label === 'string')
            return item?.label?.toLowerCase().includes(e.target.value.toLowerCase());
          return false;
        }
        );
      }

      setFilteredOptions(newFilteredOptions);
    };

    const handleSelectValue = (item: Option) => {
      if (kind === "currency") {
        setSelectedValue(item?.value as string);
      } else if (kind === "phone") {
        setSelectedValue(item?.label as string);
      } else {
        setSelectedValue(item?.label as string);
      }

      setSelectIcon(item?.icon);
      setSelectOpen(false);
      setFilteredOptions(options);

      if (onChangeValue) {
        onChangeValue(item);
        return;
      }

      if (props?.id) {
        if (item?.label === "") {
          if (setError) setError(true);
          form.setFields([
            { name: props?.id, errors: [errorMessage], value: "" },
          ]);
        } else {
          if (setError) setError(false);

          if (kind && kind === "currency") {
            form.setFields([
              {
                name: props?.id,
                errors: undefined,
                value: item?.value as string,
              },
            ]);
          } else if (kind === "phone") {
            form.setFields([
              {
                name: props?.id,
                errors: undefined,
                value: item?.label as string,
              },
            ]);
          } else {
            form.setFields([
              {
                name: props?.id,
                errors: undefined,
                value: item?.label as string,
              },
            ]);
          }
        }
      }
    };

    return (
      <div ref={dropdownRef} className="relative max-w-full">
        {startIcon && (
          <span className="absolute top-1/3 left-[14px] z-10 mt-[-2px]">
            {startIcon}
          </span>
        )}

        <div
          className={`${className} rounded-lg border border-[#d9d9d9] hover:border-mainColor z-10  
          focus:border-mainColor focus:shadow focus:shadow-blue-300 active:border-mainColor pr-[33px]  
          active:shadow active:shadow-blue-300 outline-none font-medium flex items-center ${
            error &&
            "!border-[#ff4d4f] hover:!border-[#ff4d4f] focus:!border-[rgb(255,77,79)] focus:!shadow-red-300 active:!border-[#ff4d4f] active:!shadow-red-300"
          } ${
            disabled &&
            "!border-[#d9d9d9] !bg-[#0000000a] !cursor-not-allowed !text-[#00000040]"
          }`}
          id={props?.id}
          {...(disabled
            ? {}
            : { onClick: () => setSelectOpen((prevState) => !prevState) })}
        >
          {(!selectedValue || selectedValue === "") && (
            <>
              {startIcon ? (
                <>
                  <span className="text-[#667085] font-normal ml-[42px]">
                    {placeholder}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[#667085] font-normal ml-[14px]">
                    {placeholder}
                  </span>
                </>
              )}
            </>
          )}

          {selectedValue && selectedValue !== "" && (
            <>
              {selectIcon ? (
                <>
                  <span className="ml-[14px]">{selectIcon}</span>
                  <span className="ml-2">{selectedValue}</span>
                </>
              ) : startIcon ? (
                <>
                  <span className="ml-[42px]">{selectedValue}</span>
                </>
              ) : (
                <span className="ml-[14px]">{selectedValue}</span>
              )}
            </>
          )}
        </div>

        <div
          className={`absolute right-[10px] top-1/3 w-[15px] h-[15px] flex 
          items-center justify-center mt-[1px] cursor-pointer`}
          {...(disabled
            ? {}
            : { onClick: () => setSelectOpen((prevState) => !prevState) })}
        >
          <div className="items-center">

          <IconDown
            className={`transition ${
              selectOpen ? "rotate-[-180deg]" : "rotate-0"
            }`}
            />
            </div>
        </div>

        {selectOpen && (
          <div
            className={`absolute !z-50 transition-all shadow-md rounded-lg border border-gray-200 mt-2 !bg-white 
            ${
              kind === "phone"
                ? "w-[350px]"
                : kind === "currency"
                ? "w-[400px]"
                : "w-full min-w-[150px]"
            } right-0`}
          >
            <div className="p-4">
              {searchable && (
                <div className="relative">
                  <input
                    className="w-full h-9 border border-[#EDEFF1] hover:border-mainColor text-base  
                focus:border-mainColor focus:shadow focus:shadow-blue-300 active:border-mainColor 
                  active:shadow active:shadow-blue-300 outline-none rounded-lg pl-[42px] pr-3"
                    placeholder="Search"
                    onChange={handleSearchOptions}
                  />
                  <div className="absolute top-1/4 text-[15px] left-[14px] mt-[-1px]">
                    <IconSearch />
                  </div>
                </div>
              )}
              <div className="overflow-y-auto max-h-[300px]">
                <ul>
                  {filteredOptions?.map((item: Option, key: number) => {
                    let bgValue = "";

                    if (item.code) {
                      if (
                        selectedValue === item.label ||
                        selectedValue === item.value ||
                        selectedValue === item.code
                      ) {
                        bgValue = "bg-gray-50";
                      } else {
                        bgValue = "bg-white";
                      }
                    } else {
                      if (
                        selectedValue === item.label ||
                        selectedValue === item.value
                      ) {
                        bgValue = "bg-gray-50";
                      } else {
                        bgValue = "bg-white";
                      }
                    }

                    return (
                      <li
                        className={`w-full h-10 rounded-[6px] p-2 text-base font-medium 
                      cursor-pointer hover:bg-gray-50 flex items-center justify-between 
                      ${bgValue}`}
                        key={key}
                        onClick={() => handleSelectValue(item)}
                      >
                        <div className="flex items-center">
                          {item.icon && (
                            <>
                              <div className="w-6 h-6 mr-2">{item.icon}</div>
                            </>
                          )}

                          {kind === "currency" && (
                            <span
                              className={`${
                                item.color && item.color !== ""
                                  ? `!text-[${item.color}]`
                                  : ""
                              }`}
                            >
                              {item.label} ({item.value})
                            </span>
                          )}

                          {kind === "phone" && (
                            <span
                              className={`${
                                item.color && item.color !== ""
                                  ? `!text-[${item.color}]`
                                  : ""
                              }`}
                            >
                              {item.country} ({item.code})
                            </span>
                          )}

                          {!kind && (
                            <span className={`${item.color && item.color !== '' ? `!text-[${item.color}]` : ''}`}>
                              {item.label}
                            </span>
                          )}
                        </div>
                        <div>
                          {kind === "currency" && (
                            <>
                              {selectedValue === item.value ? (
                                <IconCheck />
                              ) : (
                                <></>
                              )}
                            </>
                          )}

                          {kind === "phone" && (
                            <>
                              {selectedValue === item.label ? (
                                <IconCheck />
                              ) : (
                                <></>
                              )}
                            </>
                          )}

                          {!kind && (
                            <>
                              {selectedValue === item.label ? (
                                <IconCheck />
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {menuStatus && (
              <>
                <Divider className="!my-2" />
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <IconSetting />
                    <p className="text-base text-[#101828] font-medium">
                      Manage templates
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
