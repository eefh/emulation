class Z80 {
    constructor() {
        (this.clock = {
            m: 0,
            t: 0,
        }),
            //registers
            (this.register = {
                a: 0, //8-bits
                b: 12,
                c: 0,
                d: 0,
                e: 16,
                h: 0,
                l: 0,
                f: 0, //flags register
                pc: 0, //16-bits //program counter
                sp: 0, //stack pointer 16-bits
                m: 0, //clocks for prev instr
                t: 0,
            });
    }

    //Adds E to A, leaving result in A register (ADD A, E)
    ADDr_e = () => {
        this.register.a += this.register.e; //perform addition
        this.register.f = 0; //clear flags
        if (!(this.register.a & 255)) this.register.f |= 0x80; //checks for zero
        if (this.register.a > 255) this.register.f |= 0x10; //checks for carry
        this.register.a &= 255; //masking to 8-bits
        this.NOP(); //takes 1 m-time
    };

    //compares B to A, setting flags (CP A, B)
    CPr_b = () => {
        let i = this.register.a; //temporary copy
        i -= this.register.b; //subtracts b
        this.register.f |= 0x40; //sets subtract flag
        if (!(i & 255)) this.register.f |= 0x80; //checks for zero
        if (i < 0) this.register.f |= 0x10; //checks for underflow
        this.NOP(); //takes 1 m-time
    };

    //no-operation (NOP)
    NOP = () => {
        this.register.m = 1;
        this.register.t = 4;
    };
}

export default Z80;
